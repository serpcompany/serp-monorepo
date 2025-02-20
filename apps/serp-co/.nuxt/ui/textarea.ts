export default {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center" as const,
    "leadingIcon": "shrink-0 text-[var(--ui-text-dimmed)]",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center" as const,
    "trailingIcon": "shrink-0 text-[var(--ui-text-dimmed)]"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2" as const,
        "trailing": "pe-2" as const,
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5" as const,
        "trailing": "pe-2.5" as const,
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5" as const,
        "trailing": "pe-2.5" as const,
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3" as const,
        "trailing": "pe-3" as const,
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3" as const,
        "trailing": "pe-3" as const,
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
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
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-[var(--ui-text-muted)] file:outline-none"
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
      "leading": true,
      "size": "xs" as const,
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm" as const,
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md" as const,
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg" as const,
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl" as const,
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs" as const,
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm" as const,
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md" as const,
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg" as const,
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl" as const,
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as const,
    "color": "primary" as const,
    "variant": "outline" as const
  }
}