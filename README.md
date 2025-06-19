# iRacing Data MCP Server 🏎️

A comprehensive Node.js Model Context Protocol (MCP) server that provides seamless access to iRacing's racing simulation data API. This project serves as both a standalone CLI tool and an MCP server for AI assistant integration.

[![npm version](https://badge.fury.io/js/iracing-data-mcp-server.svg)](https://badge.fury.io/js/iracing-data-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

### 🤖 MCP Server Integration
- **AI Assistant Ready**: Seamlessly integrate with Claude, ChatGPT, and other AI assistants
- **Real-time Data Access**: Live access to iRacing's comprehensive racing data
- **Automatic Authentication**: Handles login and session management automatically
- **Type-safe Operations**: Full TypeScript support with Zod schema validation

### 📊 Data Access
- **Member Profiles**: Detailed driver information including licenses and ratings
- **Team Information**: Comprehensive team data and statistics
- **Career Statistics**: Complete racing career history and achievements
- **Season Recaps**: Detailed season performance and progression
- **Driver Lookup**: Search and find drivers by name
- **API Documentation**: Built-in access to iRacing's API documentation

### 🛠️ Dual Interface
- **MCP Server**: For AI assistant integration
- **CLI Tool**: For direct command-line access and automation

## 🚀 Quick Start

### Installation

```bash
npm install -g iracing-data-mcp-server
```

### Environment Setup

Create a `.env` file in your project directory:

```env
# Required: Path to store authentication cookies
COOKIE_JAR=./cookies.txt

# Required: Your iRacing account credentials
EMAIL=your.email@example.com

# Option 1: Use your iRacing password
PASSWORD=your_password

# Option 2: Use pre-generated API key (recommended for security)
# API_KEY=your_api_key_here
```

### Initial Authentication

Before using the server, authenticate with iRacing:

```bash
# Using npm script (if cloned from source)
npm run login

# Or using the CLI directly
iracing-data-mcp-server login
```

## 📖 Usage

### As MCP Server

Start the MCP server for AI assistant integration:

```bash
iracing-data-mcp-server
```

The server will run and provide the following tools to AI assistants:

#### Available MCP Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `login` | Authenticate with iRacing | None |
| `get_members_profile` | Get member profile data | `member_ids: number[]` |
| `get_team` | Retrieve team information | `team_id: string` |
| `get_member_recap` | Get season recap data | `member_id: number`, `year?: number`, `season?: number` |
| `get_member_career` | Get career statistics | `member_id: number` |
| `driver_lookup` | Search for drivers | `driver_name: string` |

### As CLI Tool

Use the command-line interface for direct data access:

#### Get Member Profile
```bash
# Single member
iracing-data-cli member 123456

# Multiple members
iracing-data-cli member 123456,789012
```

#### Get Team Information
```bash
iracing-data-cli team "Team Penske"
```

#### Get Member Career Data
```bash
iracing-data-cli member-career 123456
```

#### Get Season Recap
```bash
# Current season recap
iracing-data-cli member-recap --member-id 123456

# Specific year and season
iracing-data-cli member-recap --member-id 123456 --year 2024 --season 1
```

#### Driver Lookup
```bash
iracing-data-cli driver-lookup "Lewis Hamilton"
```

#### API Documentation
```bash
iracing-data-cli documentation
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- iRacing account with active subscription

### Clone and Install
```bash
git clone https://github.com/yourusername/iracing-data-mcp-server.git
cd iracing-data-mcp-server
npm install
```

### Environment Configuration
```bash
cp .env.example .env
# Edit .env with your credentials
```

### Development Scripts
```bash
# Run CLI in development mode
npm run api -- member 123456

# Login to iRacing
npm run login

# Build the project
npm run build

# Lint and format code
npm run check
```

## 🔐 Authentication & Security

### API Key vs Password

**Recommended**: Use an API key for enhanced security:

1. **Generate API Key**: 
   ```javascript
   const crypto = require('crypto');
   const apiKey = crypto.createHash('sha256')
     .update(password + email)
     .digest('base64');
   ```

2. **Set in Environment**:
   ```env
   API_KEY=your_generated_api_key
   # Remove PASSWORD variable when using API_KEY
   ```

### Cookie Management

The server automatically manages authentication cookies:
- Stores cookies in the path specified by `COOKIE_JAR`
- Automatically refreshes expired sessions
- Handles authentication errors gracefully

### Security Best Practices

- Never commit `.env` files to version control
- Use API keys instead of passwords when possible
- Regularly rotate credentials
- Store cookie files in secure locations
- Use environment-specific configurations

## 📚 API Reference

### Member Data Structure

```typescript
interface MemberData {
  members: Array<{
    licenses: License[];
    // ... other member fields
  }>;
}

interface License {
  category_id: number;
  category: string;
  category_name: string;
  license_level: number;
  safety_rating: number;
  cpi: number;
  tt_rating: number;
  mpr_num_races: number;
  color: string;
  group_name: string;
  group_id: number;
  pro_promotable: boolean;
  seq: number;
  mpr_num_tts: number;
}
```

### Error Handling

All API calls include comprehensive error handling:

```javascript
try {
  const memberData = await member('123456');
  console.log(memberData);
} catch (error) {
  console.error('Failed to fetch member data:', error.message);
}
```

## 🔍 Troubleshooting

### Common Issues

#### Authentication Failures
```bash
Error: Failed to login
```
- **Solution**: Verify your email and password/API key are correct
- Check that your iRacing subscription is active
- Ensure no special characters in credentials

#### Cookie Jar Errors
```bash
Error: COOKIE_JAR environment variable is not set
```
- **Solution**: Set the `COOKIE_JAR` environment variable to a valid file path
- Ensure the directory exists and is writable

#### Network Issues
```bash
Error: Failed to fetch data from https://members-ng.iracing.com/data/...
```
- **Solution**: Check your internet connection
- Verify iRacing services are operational
- Try re-authenticating with `npm run login`

### Debug Mode

Enable verbose logging:
```bash
DEBUG=* iracing-data-mcp-server
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**:
   ```bash
   npm run check
   npm run build
   ```
5. **Commit your changes**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards

- Follow TypeScript best practices
- Use Biome for linting and formatting
- Add type definitions for new API endpoints
- Include error handling for all API calls
- Update documentation for new features

### Adding New Endpoints

1. Create a new module in `src/`
2. Add the endpoint to `src/index.ts` exports
3. Update the MCP server in `mcp-server.ts`
4. Add CLI command in `index.ts`
5. Update this README

## 📋 Project Structure

```
iracing-data-mcp-server/
├── src/
│   ├── constant.ts          # API constants
│   ├── documentation.ts     # API documentation
│   ├── driver-lookup.ts     # Driver search functionality
│   ├── index.ts            # Module exports
│   ├── login.ts            # Authentication logic
│   ├── member-career.ts    # Career statistics
│   ├── member-recap.ts     # Season recap data
│   ├── member.ts           # Member profiles
│   ├── team.ts             # Team information
│   └── repository/
│       └── api.ts          # Core API client
├── index.ts                # CLI interface
├── mcp-server.ts          # MCP server implementation
├── storage.ts             # Authentication storage
├── perform-login.ts       # Login utility
└── package.json
```

## 📊 Roadmap

### Upcoming Features
- [ ] 🏁 Race results and session data
- [ ] 📈 Statistical analysis tools
- [ ] 🏆 Championship and series data
- [ ] 🚗 Car and track information
- [ ] 📱 Web dashboard interface
- [ ] 🔄 Real-time data streaming
- [ ] 📊 Data export functionality
- [ ] 🧪 Testing suite

### Performance Improvements
- [ ] Response caching
- [ ] Batch API requests
- [ ] Connection pooling
- [ ] Rate limiting

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/iracing-data-mcp-server/issues)
- **Documentation**: [API Documentation](./README_API_Documentation.md)
- **Community**: [Discord Server](https://discord.gg/iracing)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- iRacing for providing the comprehensive racing data API
- The Model Context Protocol team for the excellent SDK
- The racing community for feedback and feature requests

---

<p align="center">
  <strong>Built with ❤️ for the racing community</strong>
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/emiliosp" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
  </a>
</p>