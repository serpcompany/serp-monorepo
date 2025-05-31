---
description: Research methodology and verification protocols to prevent assumption-based failures
globs: **/*
alwaysApply: true
---

# Research Methodology and Verification Protocols

## The Problem This Rule Prevents

**Anti-Pattern**: Making assumptions about documentation or best practices without proper verification, leading to incorrect implementations.

**Example Failure**: Assuming "strict mode" is recommended when documentation explicitly states default settings use `strict: false`.

## Research Verification Protocol

### 1. Multi-Source Research Requirement

When researching any technology, framework, or module:

- **NEVER rely on a single source or method**
- **ALWAYS use at least 2 different research approaches:**
  - WebFetch for direct documentation access
  - WebSearch for broader context and verification
  - Context7 or LLMs.txt resources when available

### 2. Documentation Fetch Validation

When using WebFetch on documentation URLs:

- **Verify the response contains actual documentation content**
- **If response contains only CSS, HTML templates, or irrelevant content:**
  - ❌ **STOP immediately**
  - ✅ **Try WebSearch instead**
  - ✅ **Look for alternative documentation sources**
  - ✅ **Never proceed with assumptions**

### 3. Default vs Best Practices Distinction

**Critical Requirement**: Always distinguish between:

- **Default Settings**: What the module/framework enables out-of-the-box
- **Best Practices**: Recommended configurations for specific use cases
- **Strict Mode**: Enhanced security/validation settings (usually optional)

**When requirements specify "default settings":**
- ✅ Research what the module enables by default
- ❌ Do NOT implement "best practices" or "strict mode"
- ❌ Do NOT make assumptions about what "should" be enabled

### 4. Pre-Implementation Verification

Before making any configuration changes:

1. **Quote the specific documentation** that supports your approach
2. **Verify your understanding matches the requirement**:
   - "default settings" = module defaults
   - "best practices" = recommended optimizations
   - "strict mode" = enhanced validation/security
3. **Cross-reference multiple sources** to confirm consistency

### 5. Research Failure Recovery

When research fails or returns unexpected results:

- **Acknowledge the failure explicitly**
- **Try alternative research methods**
- **Ask for clarification rather than guessing**
- **Document what went wrong to prevent repetition**

## Research Checklist

Before implementing any configuration changes:

- [ ] Used at least 2 different research methods
- [ ] Verified documentation content is relevant and complete
- [ ] Distinguished between defaults, best practices, and strict modes
- [ ] Confirmed approach matches the specific requirement
- [ ] Cross-referenced findings with multiple sources
- [ ] Can quote specific documentation supporting the approach

## Examples

### ✅ Correct Research Approach

```
User asks for "Nuxt Security default settings"
1. Try WebFetch on official docs
2. If WebFetch fails, use WebSearch immediately  
3. Verify findings show strict: false as default
4. Implement only the default configuration
5. Quote documentation: "strict: false is the default value"
```

### ❌ Incorrect Research Approach

```
User asks for "Nuxt Security default settings"
1. WebFetch returns CSS instead of docs
2. Assume "strict mode" must be best practice
3. Implement strict: true without verification
4. Result: Wrong implementation that doesn't match requirements
```

## Self-Healing Triggers

This rule should be referenced when:

- Any WebFetch returns unexpected content types
- Making assumptions about "defaults" vs "best practices"
- Implementing security or performance configurations
- Working with any new module or framework
- Research methods fail to return clear documentation

## Recovery Actions

When this rule is triggered:

1. **Stop current implementation immediately**
2. **Restart research using alternative methods**
3. **Explicitly verify requirement interpretation**
4. **Document the research failure and recovery**
5. **Update this rule if new failure patterns emerge**