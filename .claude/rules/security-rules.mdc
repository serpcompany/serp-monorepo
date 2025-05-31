---
description: Security rules and guidelines for the SERP Monorepo
globs:
alwaysApply: true
---

# Security Rules and Guidelines

## Credential Management
Environment Variables:
- Never hardcode API keys, passwords, or sensitive config
- Use `.env` files for local development (add to `.gitignore`)
- Use secure environment variable management in production
- Consider a secrets manager service for production environments

## Database Security
Rate Limiting:
- Implement at the database level
- Set connection pool limits
- Add query timeouts and transaction limits
- Monitor and alert on unusual query patterns

Row Level Security (RLS):
- Enforce access policies at the database level
- Test your RLS policies thoroughly (tools like ClampDB can help)
- Use UUIDs instead of incremental IDs to prevent enumeration attacks

## API Security
Rate Limiting:
- Implement across all API endpoints
- Track requests by IP, user ID, and API key
- Set appropriate limits based on endpoint sensitivity
- Add graceful degradation for approaching limits

## Input Validation:
- Validate all user inputs at every layer
- Use strong typing and schemas where possible
- Sanitize inputs before processing or storing
- Implement CSRF tokens for all POST/PUT/DELETE requests

## Version Control Security
`.gitignore`: Properly configure to exclude:
- Environment files (`.env`, `.env.local`, etc.)
- Log files and debugging information
- Dependency directories (`node_modules`, `vendor`, etc.)
- Credential files, certificates, and keys

`.dockerignore`: Configure to exclude:
- Development-only files
- Test files and fixtures
- Documentation and non-essential assets
- Local configuration

## Infrastructure Security
- Cloudflare DNS proxy and site cache
- Web Application Firewalls (WAFs)
- Tunnels and reverse proxies
- Local firewalls (UFW, IPTABLES)
- mTLS authentication
- Certificate Authority (CA)
- CI/CD security practices with scanning in the pipeline

## Code-Level Security
OWASP Top 10:
- SQL Injection prevention
- Cross-site scripting (XSS) protection
- Insecure deserialization mitigation
- Broken authentication prevention
- Regular Scanning:
- Static Application Security Testing (SAST)
- Dynamic Application Security Testing (DAST)
- Software Composition Analysis (SCA)
- Specialized scanners like Corgea

## User Authentication & Sessions
- Secure Password Storage: Use proper hashing algorithms (bcrypt, Argon2)
- Multi-Factor Authentication: Implement where possible
- Session Management: Use secure, `httpOnly`, `SameSite` cookies
- Account Lockout Policies: Prevent brute force attacks
