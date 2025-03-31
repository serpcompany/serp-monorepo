# README

This contains a central typescript configurations with the base/default settings that each of the `apps/` and `packages/` extend from.

Each of the `apps/` and `packages/` needs to have their own `tsconfig.json` file in them which extends these base settings.

## `packages/` level `tsconfig.json` base file
```json
{
  "extends": [
    "@serp/configs/tsconfig",
    "./.playground/.nuxt/tsconfig.json"
  ]
}
```

## `apps/` level `tsconfig.json` base file
```json
{
  "extends": [
    "@serp/configs/tsconfig",
    "./.nuxt/tsconfig.json"
  ]
}
```
