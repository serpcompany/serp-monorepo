# Testing Best Practices:

## TDD Workflow:

- Generate tests "TDD" first using the Frontend Testing MCP
- Implement features to make tests pass using Red, Green, Refactor
- Use visual verification with screenshot tools
- Develop with test:watch on so the Vitest watcher is constantly tracking on changes

## Component Testing:

- Use Vitest with browser mode for real DOM testing
- Generate component tests automatically
- Test at multiple viewport sizes

## E2E Testing:

- Use Playwright for cross-browser coverage
- Test critical user journeys
- Include accessibility testing

## Visual Regression:

- Capture screenshots at key states
- Compare against design references
- Test responsive breakpoints

## Performance Testing:

- Use Lighthouse integration in Puppeteer MCP
- Monitor bundle sizes
- Test loading performance
