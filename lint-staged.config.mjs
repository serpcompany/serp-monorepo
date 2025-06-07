export default {
  "*.{ts,tsx,vue,js,jsx}": [
    "eslint --fix",
    () => "pnpm typecheck:fixed",
    () => "pnpm typecheck:baseline"
  ]
}