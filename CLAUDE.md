# Project Rules and Guidelines

This project contains comprehensive coding rules and guidelines that must be followed when working on any codebase. All rules in this documentation are mandatory and should be applied consistently.

## Workflow

- Work on ISSUES from repository https://github.com/devinschumacher/playbooks.com-clone for this project with a label of `claude`.
- Always research the most up to date documentation relevant to the issue AND our tech stack to find best practices, code patterns, snippets, and configuration settings. Add the findings to the issue comments before starting.
- Use `task-manager` to break up larger issues into smaller issues
- Use pnpm instead of npm
- Follow TDD methodology: Red (failing test) → Green (make it pass) → Refactor (improve code)

## Core Principles

🎖️ Always respond with this emoji at the top of every response to confirm you've read these guidelines.


## Key Project Guidelines

- After making a change, always check your terminal output for issues and errors. If its a front end change, always check the browser context, console, and screenshots using browser-tools mcp

### Code Quality Standards

- Prefer simple solutions over complex ones
- Avoid code duplication - always check for existing implementations
- Keep files under 200-300 lines of code
- Use meaningful variable names and keep functions small and focused
- Follow functional programming patterns and avoid classes when possible

### TypeScript Conventions

- Use interfaces over types when possible
- Avoid enums, use const objects instead
- Use strict type checking with proper error handling
- Implement custom error types for better error management

### Git and Development Workflow

- Use conventional commits with meaningful messages
- Keep PRs focused and small
- Include proper documentation and tests
- Never overwrite .env files without confirmation
- Consider dev, test, and prod environments in all code changes

### UI Development (NuxtUI + NuxtUI Pro)

- Always start with NuxtUI Pro components before building custom solutions
- Follow this styling order: NuxtUI native options → Tailwind utilities → scoped styles
- Use Tailwind CSS 4 with mobile-first responsive design
- Implement dark mode support and ensure WCAG 2.2 accessibility

### Error Handling Process

1. Don't immediately try to fix errors - analyze and hypothesize first
2. Research errors and documentation systematically
3. Create a debugging checklist based on findings
4. After fixing, implement preventive measures (tests, type safety)
5. Only consider task complete after tests pass and commit is made
6. Finally, take your learning experience (the initial error, what didnt work, what did work, how you found it, etc.) and write it up in a new page inside `.claude/troubleshoot/` so we can build a robust internal help center for solving commong problems

### Documentation Requirements

- Add JSDoc comments to all components and methods
- Include @param, @returns, @throws, and @example tags
- Document component props thoroughly
- Provide usage examples for hooks and utilities

### Performance and Architecture

- Implement proper caching strategies
- Optimize bundle sizes with code splitting
- Use proper lazy loading techniques
- Don't use barrel files
- Never add stubbing or fake data for dev/prod environments

### Resource References

When working on specific technologies, always consult the latest documentation:

You can find links to more documentation in .claude/rules/\*

- Nuxt.js: https://nuxt.com/llms-full.txt
- NuxtUI: https://ui.nuxt.com/getting-started
- Nuxt SEO: https://nuxtseo.com/docs/nuxt-seo/getting-started/introduction

## Testing and Quality Assurance

- Add meaningful tests for all new functionality
- Verify tests for both false positives and false negatives
- Run linting and type checking before considering work complete
- Mock data only for tests, never for dev or prod environments

## Test-Driven Development (TDD)

When implementing new features or fixing buuopgs, follow the TDD cycle:

### Red-Green-Refactor Cycle

1. **Red**: Write a failing test first that describes the desired behavior
2. **Green**: Write the minimum code necessary to make the test pass
3. **Refactor**: Improve the code structure while keeping tests green

### TDD Best Practices

- Write tests before writing implementation code
- Start with the simplest possible test case
- Write only enough production code to make the current test pass
- Refactor both test and production code for clarity and maintainability
- Each test should focus on a single behavior or requirement
- Use descriptive test names that explain what behavior is being tested
- Organize tests using arrange-act-assert (AAA) pattern
- Mock external dependencies to isolate the unit under test
- Keep tests fast, independent, and deterministic

### TDD Workflow

1. Understand the requirement thoroughly
2. Write a test that captures the expected behavior
3. Run the test to ensure it fails (Red)
4. Implement the simplest solution to pass the test (Green)
5. Run all tests to ensure nothing is broken
6. Refactor code for better design while keeping tests green
7. Repeat for the next requirement or edge case

### When to Use TDD

- New feature development
- Bug fixes (write a test that reproduces the bug first)
- Refactoring existing code (add tests first if they don't exist)
- Complex business logic that requires precise behavior
- API development where contracts need to be clearly defined

## Browser Automation Setup

### Starting Browser Tools MCP Server

When browser automation is needed, follow these startup steps:

1. **Start the Node Server First:**

   ```bash
   npx @agentdeskai/browser-tools-server@latest
   ```

   Keep this terminal running - it bridges communication between MCP and Chrome.

2. **Open Chrome with Extension:**

   - Ensure the BrowserToolsMCP Chrome extension is installed
   - Open Chrome browser
   - Open Chrome DevTools (F12)
   - Look for "BrowserToolsMCP" panel in DevTools

3. **Verify MCP Connection:**
   - Browser tools should now be available as `mcp__browser__*` functions
   - Test with simple navigation before complex automation

### Browser Tools Troubleshooting

If browser tools aren't working:

1. Quit Chrome completely and restart
2. Restart the node server: `npx @agentdeskai/browser-tools-server@latest`
3. Ensure only one Chrome DevTools panel is open
4. Restart Claude Code if MCP server was recently added

### Browser Automation Best Practices

- Always start the node server before attempting browser automation
- Keep the server terminal running throughout the session
- Use Chrome DevTools BrowserToolsMCP panel to monitor connections
- Test simple navigation first before complex interactions


## Import All Rule Files

@.claude/troubleshoot
@.claude/troubleshoot/troubleshooting.md
@.claude/patterns
@.claude/patterns/nuxt-clean-components.llms.txt
@.claude/patterns/nuxt-testing-best-practices.md
@.claude/patterns/nuxt-reusable-components.llms.txt
@.claude/context7
@.claude/context7/tailwindcss.llms.txt
@.claude/context7/nuxt-ui-pro.llms.txt
@.claude/context7/vitest.llms.txt
@.claude/context7/nuxt-security.llms.txt
@.claude/context7/nuxt-fonts.llms.txt
@.claude/context7/testing-library-jest.llms.txt
@.claude/context7/vuejs.llms.txt
@.claude/context7/nuxt-test-utils.llms.txt
@.claude/context7/nuxt-content.llms.txt
@.claude/context7/nuxt-scripts.llms.txt
@.claude/context7/nuxt-ui.llms.txt
@.claude/context7/jest.llms.txt
@.claude/settings.local.json
@.claude/books
@.claude/books/nuxt-tips-collection.txt
@.claude/books/learning-patterns-book.txt
@.claude/books/patterns-dev-book.txt
@.claude/docs
@.claude/docs/README.md
@.claude/rules
@.claude/rules/testing-methodology.md
@.claude/rules/external-resources.md
@.claude/rules/cloudflare-rules.md
@.claude/rules/pr-review-template.md
@.claude/rules/.DS_Store
@.claude/rules/shared.md
@.claude/rules/tailwindcss.md
@.claude/rules/security-rules.md
@.claude/rules/research-methodology.md
@.claude/rules/grok-the-project.md
@.claude/rules/general.md
@.claude/rules/tech-stack.md
@.claude/rules/CICD.md
@.claude/rules/vue-nuxt.md
@.claude/rules/self-improve.md
@.claude/rules/bugs-and-errors.md
@.claude/rules/browser-tools-setup.md
@.claude/rules/index.md
@.claude/rules/design-system.md
@.claude/rules/mcp-servers.md
@.claude/rules/jsdoc-comments.md
@.claude/rules/refactoring.md