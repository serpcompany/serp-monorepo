export default {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "size": {
      "xs": "px-2 py-1 text-xs gap-1",
      "sm": "px-2.5 py-1.5 text-xs gap-1.5",
      "md": "px-2.5 py-1.5 text-sm gap-1.5",
      "lg": "px-3 py-2 text-sm gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg)] ring ring-inset ring-[var(--ui-border-accented)]",
      "soft": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)]/50 hover:bg-[var(--ui-bg-elevated)] focus:bg-[var(--ui-bg-elevated)] disabled:bg-[var(--ui-bg-elevated)]/50",
      "subtle": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)] ring ring-inset ring-[var(--ui-border-accented)]",
      "ghost": "text-[var(--ui-text-highlighted)] bg-transparent hover:bg-[var(--ui-bg-elevated)] focus:bg-[var(--ui-bg-elevated)] disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-[var(--ui-text-highlighted)] bg-transparent"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
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
    },
    {
      "orientation": "horizontal" as const,
      "size": "xs" as const,
      "class": "px-7"
    },
    {
      "orientation": "horizontal" as const,
      "size": "sm" as const,
      "class": "px-8"
    },
    {
      "orientation": "horizontal" as const,
      "size": "md" as const,
      "class": "px-9"
    },
    {
      "orientation": "horizontal" as const,
      "size": "lg" as const,
      "class": "px-10"
    },
    {
      "orientation": "horizontal" as const,
      "size": "xl" as const,
      "class": "px-11"
    },
    {
      "orientation": "vertical" as const,
      "size": "xs" as const,
      "class": "pe-7"
    },
    {
      "orientation": "vertical" as const,
      "size": "sm" as const,
      "class": "pe-8"
    },
    {
      "orientation": "vertical" as const,
      "size": "md" as const,
      "class": "pe-9"
    },
    {
      "orientation": "vertical" as const,
      "size": "lg" as const,
      "class": "pe-10"
    },
    {
      "orientation": "vertical" as const,
      "size": "xl" as const,
      "class": "pe-11"
    }
  ],
  "defaultVariants": {
    "size": "md" as const,
    "color": "primary" as const,
    "variant": "outline" as const
  }
}