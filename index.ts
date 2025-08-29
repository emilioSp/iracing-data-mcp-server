#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { Command } from 'commander';
import {
  documentation, driverLookup,
  member,
  memberCareer,
  memberRecap,
  team,
} from './src/index.ts';
import { performLogin } from './src/login.ts';
import { storage } from './storage.ts';

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

const program = new Command();

program.name('iracing-data-cli').description('CLI for iRacing Data API');

// Documentation command
program
  .command('documentation')
  .description('Get API documentation')
  .action(async () => {
    await storage.run({ authCookie }, async () => {
      await documentation();
    });
  });

// Team command
program
  .command('team')
  .description('Get team data')
  .argument('<team_id>', 'Team ID to fetch data for')
  .action(async (teamId: string) => {
    await storage.run({ authCookie }, async () => {
      const teamData = await team(teamId);
      console.log(JSON.stringify(teamData, null, 2));
    });
  });

// Member command
program
  .command('member')
  .description('Get member profile data')
  .argument('<member_ids>', 'Comma-separated member IDs to fetch data for')
  .action(async (memberIds: string) => {
    await storage.run({ authCookie }, async () => {
      const memberData = await member(memberIds);
      console.log(JSON.stringify(memberData, null, 2));
    });
  });

// Member recap command
program
  .command('member-recap')
  .description('Get member recap data')
  .requiredOption('--member-id <number>', 'Customer ID', (value) =>
    Number(value),
  )
  .option('--year <number>', 'Year', (value) => Number(value))
  .option('--season <number>', 'Season', (value) => Number(value))
  .action(async (options) => {
    await storage.run({ authCookie }, async () => {
      const recapData = await memberRecap({
        member_id: options.custId,
        year: options.year,
        season: options.season,
      });
      console.log(JSON.stringify(recapData, null, 2));
    });
  });

// Member career command
program
  .command('member-career')
  .description('Get member career data')
  .argument('<member_id>', 'Member ID to fetch career data for', (value) =>
    Number.parseInt(value, 10),
  )
  .action(async (memberId: number) => {
    await storage.run({ authCookie }, async () => {
      const careerData = await memberCareer(memberId);
      console.log(JSON.stringify(careerData, null, 2));
    });
  });

program
  .command('driver-lookup')
  .description('Get driver lookup data')
  .argument('<driver_name>', 'Driver to fetch data for')
  .action(async (driverName: string) => {
    await storage.run({ authCookie }, async () => {
      const driverData = await driverLookup(driverName);
      console.log(JSON.stringify(driverData, null, 2));
    });
  });

// Parse command line arguments
program.parse();
