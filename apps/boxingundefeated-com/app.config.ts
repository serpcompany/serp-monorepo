export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    button: {
      slots: {
        base: [
          'rounded-none font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
          'transition-colors'
        ]
      }
    },
    textarea: {
      slots: {
        base: [
          'w-full rounded-none border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ]
      }
    }
  }
});
