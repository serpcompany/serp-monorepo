export default {
  "slots": {
    "base": [
      "rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none"
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
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "leadingAvatarSize": "xs",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/75 disabled:bg-[var(--ui-primary)] aria-disabled:bg-[var(--ui-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/75 disabled:bg-[var(--ui-secondary)] aria-disabled:bg-[var(--ui-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-success)] hover:bg-[var(--ui-success)]/75 disabled:bg-[var(--ui-success)] aria-disabled:bg-[var(--ui-success)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-info)] hover:bg-[var(--ui-info)]/75 disabled:bg-[var(--ui-info)] aria-disabled:bg-[var(--ui-info)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-warning)] hover:bg-[var(--ui-warning)]/75 disabled:bg-[var(--ui-warning)] aria-disabled:bg-[var(--ui-warning)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-error)] hover:bg-[var(--ui-error)]/75 disabled:bg-[var(--ui-error)] aria-disabled:bg-[var(--ui-error)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-error)]"
    },
    {
      "color": "primary" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-primary)]/50 text-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-secondary)]/50 text-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-success)]/50 text-[var(--ui-success)] hover:bg-[var(--ui-success)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-info)]/50 text-[var(--ui-info)] hover:bg-[var(--ui-info)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-warning)]/50 text-[var(--ui-warning)] hover:bg-[var(--ui-warning)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-error)]/50 text-[var(--ui-error)] hover:bg-[var(--ui-error)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--ui-error)]"
    },
    {
      "color": "primary" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-primary)] bg-[var(--ui-primary)]/10 hover:bg-[var(--ui-primary)]/15 focus-visible:bg-[var(--ui-primary)]/15 disabled:bg-[var(--ui-primary)]/10 aria-disabled:bg-[var(--ui-primary)]/10"
    },
    {
      "color": "secondary" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-secondary)] bg-[var(--ui-secondary)]/10 hover:bg-[var(--ui-secondary)]/15 focus-visible:bg-[var(--ui-secondary)]/15 disabled:bg-[var(--ui-secondary)]/10 aria-disabled:bg-[var(--ui-secondary)]/10"
    },
    {
      "color": "success" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-success)] bg-[var(--ui-success)]/10 hover:bg-[var(--ui-success)]/15 focus-visible:bg-[var(--ui-success)]/15 disabled:bg-[var(--ui-success)]/10 aria-disabled:bg-[var(--ui-success)]/10"
    },
    {
      "color": "info" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-info)] bg-[var(--ui-info)]/10 hover:bg-[var(--ui-info)]/15 focus-visible:bg-[var(--ui-info)]/15 disabled:bg-[var(--ui-info)]/10 aria-disabled:bg-[var(--ui-info)]/10"
    },
    {
      "color": "warning" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-warning)] bg-[var(--ui-warning)]/10 hover:bg-[var(--ui-warning)]/15 focus-visible:bg-[var(--ui-warning)]/15 disabled:bg-[var(--ui-warning)]/10 aria-disabled:bg-[var(--ui-warning)]/10"
    },
    {
      "color": "error" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-error)] bg-[var(--ui-error)]/10 hover:bg-[var(--ui-error)]/15 focus-visible:bg-[var(--ui-error)]/15 disabled:bg-[var(--ui-error)]/10 aria-disabled:bg-[var(--ui-error)]/10"
    },
    {
      "color": "primary" as const,
      "variant": "subtle" as const,
      "class": "text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/25 bg-[var(--ui-primary)]/10 hover:bg-[var(--ui-primary)]/15 disabled:bg-[var(--ui-primary)]/10 aria-disabled:bg-[var(--ui-primary)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "variant": "subtle" as const,
      "class": "text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/25 bg-[var(--ui-secondary)]/10 hover:bg-[var(--ui-secondary)]/15 disabled:bg-[var(--ui-secondary)]/10 aria-disabled:bg-[var(--ui-secondary)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "variant": "subtle" as const,
      "class": "text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/25 bg-[var(--ui-success)]/10 hover:bg-[var(--ui-success)]/15 disabled:bg-[var(--ui-success)]/10 aria-disabled:bg-[var(--ui-success)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "variant": "subtle" as const,
      "class": "text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/25 bg-[var(--ui-info)]/10 hover:bg-[var(--ui-info)]/15 disabled:bg-[var(--ui-info)]/10 aria-disabled:bg-[var(--ui-info)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "variant": "subtle" as const,
      "class": "text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/25 bg-[var(--ui-warning)]/10 hover:bg-[var(--ui-warning)]/15 disabled:bg-[var(--ui-warning)]/10 aria-disabled:bg-[var(--ui-warning)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "variant": "subtle" as const,
      "class": "text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/25 bg-[var(--ui-error)]/10 hover:bg-[var(--ui-error)]/15 disabled:bg-[var(--ui-error)]/10 aria-disabled:bg-[var(--ui-error)]/10 focus-visible:ring-2 focus-visible:ring-[var(--ui-error)]"
    },
    {
      "color": "primary" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/10 focus-visible:bg-[var(--ui-primary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-secondary)] hover:bg-[var(--ui-secondary)]/10 focus-visible:bg-[var(--ui-secondary)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-success)] hover:bg-[var(--ui-success)]/10 focus-visible:bg-[var(--ui-success)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-info)] hover:bg-[var(--ui-info)]/10 focus-visible:bg-[var(--ui-info)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-warning)] hover:bg-[var(--ui-warning)]/10 focus-visible:bg-[var(--ui-warning)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-error)] hover:bg-[var(--ui-error)]/10 focus-visible:bg-[var(--ui-error)]/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-primary)] hover:text-[var(--ui-primary)]/75 disabled:text-[var(--ui-primary)] aria-disabled:text-[var(--ui-primary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-secondary)] hover:text-[var(--ui-secondary)]/75 disabled:text-[var(--ui-secondary)] aria-disabled:text-[var(--ui-secondary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-success)] hover:text-[var(--ui-success)]/75 disabled:text-[var(--ui-success)] aria-disabled:text-[var(--ui-success)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-info)] hover:text-[var(--ui-info)]/75 disabled:text-[var(--ui-info)] aria-disabled:text-[var(--ui-info)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-warning)] hover:text-[var(--ui-warning)]/75 disabled:text-[var(--ui-warning)] aria-disabled:text-[var(--ui-warning)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-error)] hover:text-[var(--ui-error)]/75 disabled:text-[var(--ui-error)] aria-disabled:text-[var(--ui-error)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-error)]"
    },
    {
      "color": "neutral" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)] hover:bg-[var(--ui-bg-inverted)]/90 disabled:bg-[var(--ui-bg-inverted)] aria-disabled:bg-[var(--ui-bg-inverted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-border-inverted)]"
    },
    {
      "color": "neutral" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)] hover:bg-[var(--ui-bg-elevated)] disabled:bg-[var(--ui-bg)] aria-disabled:bg-[var(--ui-bg)] focus-visible:ring-2 focus-visible:ring-[var(--ui-border-inverted)]"
    },
    {
      "color": "neutral" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-text)] bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-accented)]/75 focus-visible:bg-[var(--ui-bg-accented)]/75 disabled:bg-[var(--ui-bg-elevated)] aria-disabled:bg-[var(--ui-bg-elevated)]"
    },
    {
      "color": "neutral" as const,
      "variant": "subtle" as const,
      "class": "ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-accented)]/75 disabled:bg-[var(--ui-bg-elevated)] aria-disabled:bg-[var(--ui-bg-elevated)] focus-visible:ring-2 focus-visible:ring-[var(--ui-border-inverted)]"
    },
    {
      "color": "neutral" as const,
      "variant": "ghost" as const,
      "class": "text-[var(--ui-text)] hover:bg-[var(--ui-bg-elevated)] focus-visible:bg-[var(--ui-bg-elevated)] hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral" as const,
      "variant": "link" as const,
      "class": "text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] disabled:text-[var(--ui-text-muted)] aria-disabled:text-[var(--ui-text-muted)] focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[var(--ui-border-inverted)]"
    },
    {
      "size": "xs" as const,
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm" as const,
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md" as const,
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg" as const,
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl" as const,
      "square": true,
      "class": "p-2"
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
    "color": "primary" as const,
    "variant": "solid" as const,
    "size": "md" as const
  }
}