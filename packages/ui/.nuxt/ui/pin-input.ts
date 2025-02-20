export default {
  "slots": {
    "root": "relative inline-flex items-center gap-1.5",
    "base": [
      "rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-[var(--ui-text-dimmed)] text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ]
  },
  "variants": {
    "size": {
      "xs": {
        "base": "size-6 text-xs"
      },
      "sm": {
        "base": "size-7 text-xs"
      },
      "md": {
        "base": "size-8 text-sm"
      },
      "lg": {
        "base": "size-9 text-sm"
      },
      "xl": {
        "base": "size-10 text-base"
      }
    },
    "variant": {
      "outline": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg)] ring ring-inset ring-[var(--ui-border-accented)]",
      "soft": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)]/50 hover:bg-[var(--ui-bg-elevated)] focus:bg-[var(--ui-bg-elevated)] disabled:bg-[var(--ui-bg-elevated)]/50",
      "subtle": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)] ring ring-inset ring-[var(--ui-border-accented)]",
      "ghost": "text-[var(--ui-text-highlighted)] bg-transparent hover:bg-[var(--ui-bg-elevated)] focus:bg-[var(--ui-bg-elevated)] disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-[var(--ui-text-highlighted)] bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-error)]"
    },
    {
      "color": "primary" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-error)]"
    },
    {
      "color": "neutral" as const,
      "variant": [
        "outline" as const,
        "subtle" as const
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-border-inverted)]"
    },
    {
      "color": "neutral" as const,
      "highlight": true,
      "class": "ring ring-inset ring-[var(--ui-border-inverted)]"
    }
  ],
  "defaultVariants": {
    "size": "md" as const,
    "color": "primary" as const,
    "variant": "outline" as const
  }
}