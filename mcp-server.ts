#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  driverLookup,
  member,
  memberCareer,
  memberRecap,
  team,
} from './src/index.js';
import { performLogin } from './src/login.js';
import { storage } from './storage.js';

const server = new McpServer({
  name: 'IRacing Data API',
  version: '1.0.0',
});

// Helper function to get auth cookie and set up storage context
async function withStorageContext<T>(callback: () => Promise<T>): Promise<T> {
  if (!process.env.COOKIE_JAR) {
    throw new Error('COOKIE_JAR environment variable is not set');
  }

  let authCookie: string;
  try {
    authCookie = readFileSync(process.env.COOKIE_JAR, 'utf8');
  } catch {
    await performLogin();
    authCookie = readFileSync(process.env.COOKIE_JAR, 'utf8');
  }

  // Parse the authCookie to get the expires attribute
  let cookieExpires: string | undefined = undefined;
  const cookieParts = authCookie.split(';');
  for (const part of cookieParts) {
    const [key, value] = part.trim().split('=');
    if (key.toLowerCase() === 'expires') {
      cookieExpires = value;
      break;
    }
  }

  const expiresDate = new Date(cookieExpires || '');
  const now = new Date();
  const diff = expiresDate.getTime() - now.getTime();

  if (diff <= 60_000) {
    await performLogin();
    authCookie = readFileSync(process.env.COOKIE_JAR, 'utf8');
  }

  return storage.run({ authCookie }, callback);
}

// Define a tool to login to iRacing
server.tool('login', {}, async () => {
  try {
    await performLogin();
    return {
      content: [{ type: 'text', text: 'Successfully logged in to iRacing' }],
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: 'text', text: `Login failed: ${errorMessage}` }],
    };
  }
});

// Define a tool to get member profile
server.tool(
  'get_members_profile',
  {
    member_ids: z.array(z.number()).refine((ids) => ids.length > 0, {
      message: 'At least one member ID is required',
    }),
  },
  async ({ member_ids }) => {
    try {
      const membersData = await withStorageContext(() =>
        member(member_ids.join()),
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(membersData, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Failed to get member profile: ${errorMessage}`,
          },
        ],
      };
    }
  },
);

// Define a tool to get team data
server.tool(
  'get_team',
  {
    team_id: z.string().refine((ids) => ids.length > 0, {
      message: 'Team ID is required',
    }),
  },
  async ({ team_id }) => {
    try {
      const teamData = await withStorageContext(() => team(team_id));
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(teamData, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          { type: 'text', text: `Failed to get team data: ${errorMessage}` },
        ],
      };
    }
  },
);

server.tool(
  'get_member_recap',
  {
    member_id: z.number(),
    year: z.number().optional(),
    season: z.number().optional(),
  },
  async ({ member_id, year, season }) => {
    try {
      const recapData = await withStorageContext(() =>
        memberRecap({
          member_id,
          year,
          season,
        }),
      );
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(recapData, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          { type: 'text', text: `Failed to get member recap: ${errorMessage}` },
        ],
      };
    }
  },
);

server.tool(
  'get_member_career',
  {
    member_id: z.number(),
  },
  async ({ member_id }) => {
    try {
      const careerData = await withStorageContext(() =>
        memberCareer(member_id),
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(careerData, null, 2) }],
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text',
            text: `Failed to get member career: ${errorMessage}`,
          },
        ],
      };
    }
  },
);

server.tool(
  'driver_lookup',
  {
    driver_name: z.string(),
  },
  async ({ driver_name }) => {
    try {
      const driverData = await withStorageContext(() =>
        driverLookup(driver_name),
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(driverData, null, 2) }],
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          { type: 'text', text: `Failed to lookup driver: ${errorMessage}` },
        ],
      };
    }
  },
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
