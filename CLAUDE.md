# GROK the project

This project contains comprehensive coding rules and guidelines that must be followed when working on any codebase. All rules in this documentation are mandatory and should be applied consistently.

Explore the entire repository to understand the codebase from multiple angles: as a software architect, software developer, product manager, project manager, quality assurance tester. I want you to compile your findings into a very extensive markdown document in the root of the repository (with the date in the filename). Include schema diagrams, flow charts, or any other graphics relevant to describing the project. Familiarize yourself with the package.json file so you understand the technologies we are working with, and their unique mix/interaction with each other.

---

# Project Rules and Guidelines

## Workflow

- Work on ISSUES from repository, login as `serp-y` user by running:

```bash
/Users/devin/gh-users/gh-users/switch-profile.sh serp-y
git config --local user.name && git config --local user.email
```

- The repo for this project is: https://github.com/devinschumacher/playbooks.com-clone
- For any issues you work on or create, and a label of `claude`.
- Always research the most up to date documentation relevant to the issue AND our tech stack to find best practices, code patterns, snippets, and configuration settings. Add the findings to the issue comments before starting.
- Follow TDD methodology: Red (failing test) → Green (make it pass) → Refactor (improve code)
- Break down your taks into subtasks in a github issue
- Start vitest in watch mode
- Add typings and correct all linter warnings and errors as you code
- Add/improve JSDoc blocks for all components and functions
- Code "TDD" (test-first), but write tests "BDD" (prioritizing the user persepctive/path of it)
- Enable browser-tools mcp so you can interact with the browser, take screenshots, get console errors, etc. (`npx @agentdeskai/browser-tools-server@1.2.0` to star the server)
- Every "completed" / "submitted" issue must include a screenshot of the UI that was worked on, and a copy of the test suite with 100% passing tests

## Core Principles

🎖️ Always respond with this emoji at the top of every response to confirm you've read these guidelines.

## Key Project Guidelines

- After making a change, always check your terminal output for issues and errors.
- For front-end changes, always check the browser context, console, and screenshots using browser-tools mcp
- Constantly research (web search), reference (in `.claude/*`) and revisit documentation, best practices, code snippets, etc. to ensure you're equipped with the best possible up-to-date knowledge of what we're working on.
- Take no shortcuts, do everything the "correct / best-practice way"
-

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
- Write TSDoc blocks

### Git and Development Workflow

- Checkout issues (as branches from `staging`) from the project's github repository
- Before doing any coding, always research & reference online documentation, web searches, context7 and other mcp servers for the mix of technologies involved in the issue
- Use conventional commits with meaningful messages, and commit SMALL and OFTEN
- Keep PRs focused and small
- Everything should be tested appropriately, keep a strong focus on SRE and software robustness
- Never overwrite .env files without confirmation
- Consider dev, test, and prod environments in all code changes

### UI Development (NuxtUI + NuxtUI Pro)

- Always start with NuxtUI / Pro components before building custom solutions
- Use Nuxt UI design tokens / props before custom Tailwind CSS
- Use Tailwind CSS directives before inline or scoped CSS
- Follow this styling order: NuxtUI native options → Tailwind utilities → scoped styles
- Use Tailwind CSS 4 with mobile-first responsive design
- If the project does not have dark mode, don't add it

### Error Handling Process

1. Don't immediately try to fix errors - analyze and logically consider the issues first
2. Then, Research documentation systematically online and through mcp server access
3. Next, Create a debugging checklist based on findings
4. After fixing, implement preventive measures (tests, type safety)
5. Only consider a task complete after tests pass and commit is made
6. Finally, take your learning experience (the initial error, what didnt work, what did work, how you found it, etc.) and write it up in a new page inside `.claude/learning/` so we can build a robust internal help center for solving commong problems

> [!IMPORTANT]
> Make sure to always document the issues and learning experience you encounter in `.claude/learning` so we can improve overtime

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
You can find links to more documentation in `.claude/rules/` & `./claude/reference/

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

@.claude/index.md
