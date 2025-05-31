Login as user `serp-y` and Please conduct a comprehensive code review of the following PR. Research and apply the latest best practices for all technologies, frameworks, and patterns used. Your review should:

## Documentation-Driven Review Process

- For each significant code pattern, function, or API usage, research the official documentation
- Verify all method signatures, parameters, and return types against current docs
- Check for deprecated features or newer recommended approaches
- Link to specific documentation sections that support your feedback
- Note any undocumented or poorly documented patterns that need clarification

## Technology-Specific Analysis

- Identify all languages, frameworks, libraries, and tools used in this code
- Research current (2024/2025) best practices for each technology
- Check for deprecated patterns, outdated syntax, or legacy approaches
- Verify compatibility with latest stable versions
- Suggest modern alternatives where applicable
- Link to migration guides or deprecation notices where relevant

## Architecture & Design Patterns

- Evaluate the overall design against current architectural best practices
- Identify which design patterns are used and whether they're appropriate
- Check for anti-patterns or code smells
- Assess SOLID principles compliance
- Review separation of concerns and modularity
- Reference architectural documentation or pattern catalogs for each finding

## Code Quality Improvements

- Performance optimizations specific to the tech stack
- Security vulnerabilities and current mitigation practices
- Accessibility concerns (if applicable)
- Error handling and resilience patterns
- Testing coverage and test quality
- Documentation completeness
- Provide links to performance guides, security advisories, or testing best practices

## Modern Best Practices

- Async/await patterns vs callbacks (if applicable)
- Type safety and proper typing (TypeScript, Python type hints, etc.)
- Modern language features that could simplify the code
- Current naming conventions and code organization standards
- CI/CD and deployment considerations
- Reference language specification updates or feature documentation

## Specific Checks

- Memory leaks or resource management issues
- Concurrency/threading concerns
- API design and RESTful/GraphQL best practices
- Database query optimization
- Caching strategies
- Logging and observability
- State management patterns
- Dependency management and version compatibility

## Required Documentation References

For each review comment, provide:

1. **Critical issues**: Link to official documentation, security advisories, or changelog entries
2. **API/Method usage**: Reference the specific docs section showing correct usage
3. **Best practices**: Cite official style guides, framework documentation, or authoritative sources
4. **Performance concerns**: Link to benchmarks, profiling guides, or optimization docs
5. **Design patterns**: Reference pattern documentation or architectural guides

## Documentation Coverage Check

- Identify any code using undocumented features or internal APIs
- Flag missing inline documentation for complex logic
- Verify example code matches documentation patterns
- Check if custom implementations align with framework conventions

## Review Output Format

Format your feedback as:

````
File: [filename]
Line X-Y: [Issue description]
Severity: [Critical/High/Medium/Low]
Category: [Security/Performance/Maintainability/Style/etc.]
Documentation: [Link to specific section]
Current code:
​```
[problematic code snippet]
​```
Recommended fix:
​```
[improved code snippet]
​```
Explanation: [Why this change improves the code, with reference to the documentation]
---
````

## Severity Guidelines

- **Critical**: Security vulnerabilities, data loss risks, breaking changes
- **High**: Performance issues, deprecated features, significant bugs
- **Medium**: Best practice violations, maintainability concerns
- **Low**: Style issues, minor optimizations, nice-to-haves

## Summary Section

After individual issues, provide:

1. Overall assessment of code quality
2. Top 3-5 most important changes needed
3. Positive aspects worth highlighting
4. Knowledge gaps where documentation was insufficient
5. Suggestions for team documentation or standards updates

Focus on meaningful issues rather than nitpicks. Not every line needs a comment - prioritize:

- Incorrect API usage
- Security vulnerabilities
- Performance problems
- Violations of documented patterns
- Deprecated approaches
- Complex logic that needs explanation

Remember to:

- Be constructive and suggest specific improvements
- Acknowledge good practices you observe
- Consider the PR's context and goals
- Balance thoroughness with actionability
- Use current documentation (check last updated dates)
- Tag the PR author `@theirUsername` within the comment body itself

PR: https://github.com/serpcompany/serp-monorepo/pull/1007/
