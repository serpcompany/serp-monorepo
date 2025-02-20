export default {
  slots: {
    base: [
      'relative group rounded-[calc(var(--ui-radius)*1.5)] inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
      'transition-colors'
    ],
    leading: 'absolute inset-y-0 start-0 flex items-center' as const,
    leadingIcon: 'shrink-0 text-[var(--ui-text-dimmed)]',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailing: 'absolute inset-y-0 end-0 flex items-center' as const,
    trailingIcon: 'shrink-0 text-[var(--ui-text-dimmed)]',
    value: 'truncate pointer-events-none',
    placeholder: 'truncate text-[var(--ui-text-dimmed)]',
    arrow: 'fill-[var(--ui-border)]',
    content:
      'max-h-60 w-[var(--reka-popper-anchor-width)] bg-[var(--ui-bg)] shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-[var(--ui-border)] overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
    viewport: 'divide-y divide-[var(--ui-border)] scroll-py-1',
    group: 'p-1 isolate',
    empty: 'py-2 text-center text-sm text-[var(--ui-text-muted)]',
    label: 'font-semibold text-[var(--ui-text-highlighted)]',
    separator: '-mx-1 my-1 h-px bg-[var(--ui-border)]',
    item: [
      'group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-[calc(var(--ui-radius)*1.5)] data-disabled:cursor-not-allowed data-disabled:opacity-75 text-[var(--ui-text)] data-highlighted:text-[var(--ui-text-highlighted)] data-highlighted:before:bg-[var(--ui-bg-elevated)]/50',
      'transition-colors before:transition-colors'
    ],
    itemLeadingIcon: [
      'shrink-0 text-[var(--ui-text-dimmed)] group-data-highlighted:text-[var(--ui-text)]',
      'transition-colors'
    ],
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemLeadingChip: 'shrink-0',
    itemLeadingChipSize: '',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemLabel: 'truncate',
    input: 'border-b border-[var(--ui-border)]'
  },
  variants: {
    buttonGroup: {
      horizontal:
        'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none',
      vertical:
        'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none'
    },
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leading: 'ps-2' as const,
        trailing: 'pe-2' as const,
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
        label: 'p-1 text-[10px]/3 gap-1',
        item: 'p-1 text-xs gap-1',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemLeadingChip: 'size-4',
        itemLeadingChipSize: 'sm',
        itemTrailingIcon: 'size-4'
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leading: 'ps-2.5' as const,
        trailing: 'pe-2.5' as const,
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
        label: 'p-1.5 text-[10px]/3 gap-1.5',
        item: 'p-1.5 text-xs gap-1.5',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemLeadingChip: 'size-4',
        itemLeadingChipSize: 'sm',
        itemTrailingIcon: 'size-4'
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leading: 'ps-2.5' as const,
        trailing: 'pe-2.5' as const,
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
        label: 'p-1.5 text-xs gap-1.5',
        item: 'p-1.5 text-sm gap-1.5',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemLeadingChip: 'size-5',
        itemLeadingChipSize: 'md',
        itemTrailingIcon: 'size-5'
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leading: 'ps-3' as const,
        trailing: 'pe-3' as const,
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
        label: 'p-2 text-xs gap-2',
        item: 'p-2 text-sm gap-2',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemLeadingChip: 'size-5',
        itemLeadingChipSize: 'md',
        itemTrailingIcon: 'size-5'
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leading: 'ps-3' as const,
        trailing: 'pe-3' as const,
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
        label: 'p-2 text-sm gap-2',
        item: 'p-2 text-base gap-2',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatarSize: 'xs',
        itemLeadingChip: 'size-6',
        itemLeadingChipSize: 'lg',
        itemTrailingIcon: 'size-6'
      }
    },
    variant: {
      outline:
        'text-[var(--ui-text-highlighted)] bg-[var(--ui-bg)] ring ring-inset ring-[var(--ui-border-accented)]',
      soft: 'text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)]/50 hover:bg-[var(--ui-bg-elevated)] focus:bg-[var(--ui-bg-elevated)] disabled:bg-[var(--ui-bg-elevated)]/50',
      subtle:
        'text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)] ring ring-inset ring-[var(--ui-border-accented)]',
      ghost:
        'text-[var(--ui-text-highlighted)] bg-transparent hover:bg-[var(--ui-bg-elevated)] focus:bg-[var(--ui-bg-elevated)] disabled:bg-transparent dark:disabled:bg-transparent',
      none: 'text-[var(--ui-text-highlighted)] bg-transparent'
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      info: '',
      warning: '',
      error: '',
      neutral: ''
    },
    leading: {
      true: ''
    },
    trailing: {
      true: ''
    },
    loading: {
      true: ''
    },
    highlight: {
      true: ''
    },
    type: {
      file: 'file:me-1.5 file:font-medium file:text-[var(--ui-text-muted)] file:outline-none'
    }
  },
  compoundVariants: [
    {
      color: 'primary' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-primary)]'
    },
    {
      color: 'secondary' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-secondary)]'
    },
    {
      color: 'success' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-success)]'
    },
    {
      color: 'info' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-info)]'
    },
    {
      color: 'warning' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-warning)]'
    },
    {
      color: 'error' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-error)]'
    },
    {
      color: 'primary' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-primary)]'
    },
    {
      color: 'secondary' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-secondary)]'
    },
    {
      color: 'success' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-success)]'
    },
    {
      color: 'info' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-info)]'
    },
    {
      color: 'warning' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-warning)]'
    },
    {
      color: 'error' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-error)]'
    },
    {
      color: 'neutral' as const,
      variant: ['outline' as const, 'subtle' as const],
      class:
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-border-inverted)]'
    },
    {
      color: 'neutral' as const,
      highlight: true,
      class: 'ring ring-inset ring-[var(--ui-border-inverted)]'
    },
    {
      leading: true,
      size: 'xs' as const,
      class: 'ps-7'
    },
    {
      leading: true,
      size: 'sm' as const,
      class: 'ps-8'
    },
    {
      leading: true,
      size: 'md' as const,
      class: 'ps-9'
    },
    {
      leading: true,
      size: 'lg' as const,
      class: 'ps-10'
    },
    {
      leading: true,
      size: 'xl' as const,
      class: 'ps-11'
    },
    {
      trailing: true,
      size: 'xs' as const,
      class: 'pe-7'
    },
    {
      trailing: true,
      size: 'sm' as const,
      class: 'pe-8'
    },
    {
      trailing: true,
      size: 'md' as const,
      class: 'pe-9'
    },
    {
      trailing: true,
      size: 'lg' as const,
      class: 'pe-10'
    },
    {
      trailing: true,
      size: 'xl' as const,
      class: 'pe-11'
    },
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'animate-spin'
      }
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'animate-spin'
      }
    }
  ],
  defaultVariants: {
    size: 'md' as const,
    color: 'primary' as const,
    variant: 'outline' as const
  }
};
