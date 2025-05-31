# Browser Tools MCP Setup Instructions

## Overview
The browser-tools MCP requires three components:
1. Chrome Extension
2. MCP Server (for IDE integration)
3. Node Server (for browser communication)

## Installation Steps

### 1. Install Chrome Extension
1. Download the extension from GitHub releases:
   ```bash
   curl -L -o BrowserTools-extension.zip https://github.com/AgentDeskAI/browser-tools-mcp/releases/download/v1.2.0/BrowserTools-1.2.0-extension.zip
   ```

2. Extract and install in Chrome:
   - Open Chrome
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extracted folder

### 2. Update MCP Configuration
Your `.mcp.json` is already configured with:
```json
"browser-tools": {
  "command": "npx",
  "args": ["-y", "@agentdesk/browser-tools-mcp"]
}
```

Note: The correct package name should be `@agentdeskai/browser-tools-mcp` based on the docs.

### 3. Start the Node Server
Open a separate terminal and run:
```bash
npx @agentdeskai/browser-tools-server@latest
```

This server handles communication between the MCP and Chrome browser.

### 4. Restart Claude Code
After setting up all components, restart Claude Code to load the new MCP server.

## Usage
1. Open Chrome with the extension installed
2. Start the node server in a terminal
3. Open Chrome DevTools
4. Look for the "BrowserToolsMCP" panel in DevTools
5. Use browser automation tools in Claude Code

## Troubleshooting
If you encounter issues:
1. Quit Chrome completely
2. Restart the local node server
3. Ensure only one Chrome DevTools panel is open
4. Restart Claude Code

## Architecture
- **Chrome Extension**: Provides browser control interface
- **Node Server**: Bridges communication between MCP and browser
- **MCP Server**: Integrates with Claude Code for tool access