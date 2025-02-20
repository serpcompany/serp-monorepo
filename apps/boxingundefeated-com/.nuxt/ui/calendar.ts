export default {
  slots: {
    root: '',
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
    heading: 'text-center font-medium truncate mx-auto',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid grid-cols-7',
    gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
    gridBody: 'grid',
    headCell: 'rounded-[calc(var(--ui-radius)*1.5)]',
    cell: 'relative text-center',
    cellTrigger: [
      'm-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-[var(--ui-text-muted)] data-unavailable:line-through data-unavailable:text-[var(--ui-text-muted)] data-unavailable:pointer-events-none data-[selected]:text-[var(--ui-bg)] data-today:font-semibold',
      'transition'
    ]
  },
  variants: {
    color: {
      primary: {
        headCell: 'text-[var(--ui-primary)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-primary)] data-[selected]:bg-[var(--ui-primary)] data-today:not-data-[selected]:text-[var(--ui-primary)] data-[highlighted]:bg-[var(--ui-primary)]/20 hover:not-data-[selected]:bg-[var(--ui-primary)]/20'
      },
      secondary: {
        headCell: 'text-[var(--ui-secondary)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-secondary)] data-[selected]:bg-[var(--ui-secondary)] data-today:not-data-[selected]:text-[var(--ui-secondary)] data-[highlighted]:bg-[var(--ui-secondary)]/20 hover:not-data-[selected]:bg-[var(--ui-secondary)]/20'
      },
      success: {
        headCell: 'text-[var(--ui-success)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-success)] data-[selected]:bg-[var(--ui-success)] data-today:not-data-[selected]:text-[var(--ui-success)] data-[highlighted]:bg-[var(--ui-success)]/20 hover:not-data-[selected]:bg-[var(--ui-success)]/20'
      },
      info: {
        headCell: 'text-[var(--ui-info)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-info)] data-[selected]:bg-[var(--ui-info)] data-today:not-data-[selected]:text-[var(--ui-info)] data-[highlighted]:bg-[var(--ui-info)]/20 hover:not-data-[selected]:bg-[var(--ui-info)]/20'
      },
      warning: {
        headCell: 'text-[var(--ui-warning)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-warning)] data-[selected]:bg-[var(--ui-warning)] data-today:not-data-[selected]:text-[var(--ui-warning)] data-[highlighted]:bg-[var(--ui-warning)]/20 hover:not-data-[selected]:bg-[var(--ui-warning)]/20'
      },
      error: {
        headCell: 'text-[var(--ui-error)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-error)] data-[selected]:bg-[var(--ui-error)] data-today:not-data-[selected]:text-[var(--ui-error)] data-[highlighted]:bg-[var(--ui-error)]/20 hover:not-data-[selected]:bg-[var(--ui-error)]/20'
      },
      neutral: {
        headCell: 'text-[var(--ui-bg-inverted)]',
        cellTrigger:
          'focus-visible:ring-[var(--ui-border-inverted)] data-[selected]:bg-[var(--ui-bg-inverted)] data-today:not-data-[selected]:text-[var(--ui-bg-inverted)] data-[highlighted]:bg-[var(--ui-bg-inverted)]/20 hover:not-data-[selected]:bg-[var(--ui-bg-inverted)]/10'
      }
    },
    size: {
      xs: {
        heading: 'text-xs',
        cell: 'text-xs',
        headCell: 'text-[10px]',
        cellTrigger: 'size-7',
        body: 'space-y-2 pt-2'
      },
      sm: {
        heading: 'text-xs',
        headCell: 'text-xs',
        cell: 'text-xs',
        cellTrigger: 'size-7'
      },
      md: {
        heading: 'text-sm',
        headCell: 'text-xs',
        cell: 'text-sm',
        cellTrigger: 'size-8'
      },
      lg: {
        heading: 'text-md',
        headCell: 'text-md',
        cellTrigger: 'size-9 text-md'
      },
      xl: {
        heading: 'text-lg',
        headCell: 'text-lg',
        cellTrigger: 'size-10 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md' as const,
    color: 'primary' as const
  }
};
