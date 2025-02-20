export default {
  slots: {
    root: 'relative flex items-start',
    base: 'shrink-0 flex items-center justify-center rounded-[var(--ui-radius)] text-[var(--ui-bg)] ring ring-inset ring-[var(--ui-border-accented)] focus-visible:outline-2 focus-visible:outline-offset-2',
    container: 'flex items-center',
    wrapper: 'ms-2',
    icon: 'shrink-0 size-full',
    label: 'block font-medium text-[var(--ui-text)]',
    description: 'text-[var(--ui-text-muted)]'
  },
  variants: {
    color: {
      primary: 'focus-visible:outline-[var(--ui-primary)]',
      secondary: 'focus-visible:outline-[var(--ui-secondary)]',
      success: 'focus-visible:outline-[var(--ui-success)]',
      info: 'focus-visible:outline-[var(--ui-info)]',
      warning: 'focus-visible:outline-[var(--ui-warning)]',
      error: 'focus-visible:outline-[var(--ui-error)]',
      neutral: 'focus-visible:outline-[var(--ui-border-inverted)]'
    },
    size: {
      xs: {
        base: 'size-3',
        container: 'h-4',
        wrapper: 'text-xs'
      },
      sm: {
        base: 'size-3.5',
        container: 'h-4',
        wrapper: 'text-xs'
      },
      md: {
        base: 'size-4',
        container: 'h-5',
        wrapper: 'text-sm'
      },
      lg: {
        base: 'size-4.5',
        container: 'h-5',
        wrapper: 'text-sm'
      },
      xl: {
        base: 'size-5',
        container: 'h-6',
        wrapper: 'text-base'
      }
    },
    required: {
      true: {
        label: "after:content-['*'] after:ms-0.5 after:text-[var(--ui-error)]"
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-75',
        label: 'cursor-not-allowed opacity-75',
        description: 'cursor-not-allowed opacity-75'
      }
    },
    checked: {
      true: ''
    }
  },
  compoundVariants: [
    {
      color: 'primary' as const,
      checked: true,
      class: 'ring-2 ring-[var(--ui-primary)] bg-[var(--ui-primary)]'
    },
    {
      color: 'secondary' as const,
      checked: true,
      class: 'ring-2 ring-[var(--ui-secondary)] bg-[var(--ui-secondary)]'
    },
    {
      color: 'success' as const,
      checked: true,
      class: 'ring-2 ring-[var(--ui-success)] bg-[var(--ui-success)]'
    },
    {
      color: 'info' as const,
      checked: true,
      class: 'ring-2 ring-[var(--ui-info)] bg-[var(--ui-info)]'
    },
    {
      color: 'warning' as const,
      checked: true,
      class: 'ring-2 ring-[var(--ui-warning)] bg-[var(--ui-warning)]'
    },
    {
      color: 'error' as const,
      checked: true,
      class: 'ring-2 ring-[var(--ui-error)] bg-[var(--ui-error)]'
    },
    {
      color: 'neutral' as const,
      checked: true,
      class:
        'ring-2 ring-[var(--ui-border-inverted)] bg-[var(--ui-bg-inverted)]'
    }
  ],
  defaultVariants: {
    size: 'md' as const,
    color: 'primary' as const
  }
};
