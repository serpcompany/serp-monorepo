export default {
  slots: {
    root: 'gap-2',
    base: 'relative overflow-hidden rounded-full bg-[var(--ui-bg-accented)]',
    indicator:
      'rounded-full size-full transition-transform duration-200 ease-out',
    status:
      'flex justify-end text-[var(--ui-text-dimmed)] transition-[width] duration-200',
    steps: 'grid items-end',
    step: 'truncate text-end row-start-1 col-start-1 transition-opacity' as const
  },
  variants: {
    animation: {
      carousel: '',
      'carousel-inverse': '',
      swing: '',
      elastic: ''
    },
    color: {
      primary: {
        indicator: 'bg-[var(--ui-primary)]',
        steps: 'text-[var(--ui-primary)]'
      },
      secondary: {
        indicator: 'bg-[var(--ui-secondary)]',
        steps: 'text-[var(--ui-secondary)]'
      },
      success: {
        indicator: 'bg-[var(--ui-success)]',
        steps: 'text-[var(--ui-success)]'
      },
      info: {
        indicator: 'bg-[var(--ui-info)]',
        steps: 'text-[var(--ui-info)]'
      },
      warning: {
        indicator: 'bg-[var(--ui-warning)]',
        steps: 'text-[var(--ui-warning)]'
      },
      error: {
        indicator: 'bg-[var(--ui-error)]',
        steps: 'text-[var(--ui-error)]'
      },
      neutral: {
        indicator: 'bg-[var(--ui-bg-inverted)]',
        steps: 'text-[var(--ui-bg)]'
      }
    },
    size: {
      '2xs': {
        status: 'text-xs',
        steps: 'text-xs'
      },
      xs: {
        status: 'text-xs',
        steps: 'text-xs'
      },
      sm: {
        status: 'text-sm',
        steps: 'text-sm'
      },
      md: {
        status: 'text-sm',
        steps: 'text-sm'
      },
      lg: {
        status: 'text-sm',
        steps: 'text-sm'
      },
      xl: {
        status: 'text-base',
        steps: 'text-base'
      },
      '2xl': {
        status: 'text-base',
        steps: 'text-base'
      }
    },
    step: {
      active: {
        step: 'opacity-100' as const
      },
      first: {
        step: 'opacity-100 text-[var(--ui-text-muted)]' as const
      },
      other: {
        step: 'opacity-0' as const
      },
      last: {
        step: ''
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full flex flex-col',
        base: 'w-full',
        status: 'flex-row'
      },
      vertical: {
        root: 'h-full flex flex-row-reverse',
        base: 'h-full',
        status: 'flex-col'
      }
    },
    inverted: {
      true: {
        status: 'self-end'
      }
    }
  },
  compoundVariants: [
    {
      inverted: true,
      orientation: 'horizontal' as const,
      class: {
        step: 'text-start' as const,
        status: 'flex-row-reverse'
      }
    },
    {
      inverted: true,
      orientation: 'vertical' as const,
      class: {
        steps: 'items-start',
        status: 'flex-col-reverse'
      }
    },
    {
      orientation: 'horizontal' as const,
      size: '2xs' as const,
      class: 'h-px'
    },
    {
      orientation: 'horizontal' as const,
      size: 'xs' as const,
      class: 'h-0.5'
    },
    {
      orientation: 'horizontal' as const,
      size: 'sm' as const,
      class: 'h-1'
    },
    {
      orientation: 'horizontal' as const,
      size: 'md' as const,
      class: 'h-2'
    },
    {
      orientation: 'horizontal' as const,
      size: 'lg' as const,
      class: 'h-3'
    },
    {
      orientation: 'horizontal' as const,
      size: 'xl' as const,
      class: 'h-4'
    },
    {
      orientation: 'horizontal' as const,
      size: '2xl' as const,
      class: 'h-5'
    },
    {
      orientation: 'vertical' as const,
      size: '2xs' as const,
      class: 'w-px'
    },
    {
      orientation: 'vertical' as const,
      size: 'xs' as const,
      class: 'w-0.5'
    },
    {
      orientation: 'vertical' as const,
      size: 'sm' as const,
      class: 'w-1'
    },
    {
      orientation: 'vertical' as const,
      size: 'md' as const,
      class: 'w-2'
    },
    {
      orientation: 'vertical' as const,
      size: 'lg' as const,
      class: 'w-3'
    },
    {
      orientation: 'vertical' as const,
      size: 'xl' as const,
      class: 'w-4'
    },
    {
      orientation: 'vertical' as const,
      size: '2xl' as const,
      class: 'w-5'
    },
    {
      orientation: 'horizontal' as const,
      animation: 'carousel' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical' as const,
      animation: 'carousel' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal' as const,
      animation: 'carousel-inverse' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical' as const,
      animation: 'carousel-inverse' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal' as const,
      animation: 'swing' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical' as const,
      animation: 'swing' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal' as const,
      animation: 'elastic' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical' as const,
      animation: 'elastic' as const,
      class: {
        indicator:
          'data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]'
      }
    }
  ],
  defaultVariants: {
    animation: 'carousel' as const,
    color: 'primary' as const,
    size: 'md' as const
  }
};
