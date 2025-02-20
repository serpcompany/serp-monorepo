export default {
  "slots": {
    "base": "rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
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
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "sm": {
        "base": "text-xs px-1.5 py-0.5 gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as const,
      "variant": "solid" as const,
      "class": "bg-[var(--ui-primary)] text-[var(--ui-bg)]"
    },
    {
      "color": "secondary" as const,
      "variant": "solid" as const,
      "class": "bg-[var(--ui-secondary)] text-[var(--ui-bg)]"
    },
    {
      "color": "success" as const,
      "variant": "solid" as const,
      "class": "bg-[var(--ui-success)] text-[var(--ui-bg)]"
    },
    {
      "color": "info" as const,
      "variant": "solid" as const,
      "class": "bg-[var(--ui-info)] text-[var(--ui-bg)]"
    },
    {
      "color": "warning" as const,
      "variant": "solid" as const,
      "class": "bg-[var(--ui-warning)] text-[var(--ui-bg)]"
    },
    {
      "color": "error" as const,
      "variant": "solid" as const,
      "class": "bg-[var(--ui-error)] text-[var(--ui-bg)]"
    },
    {
      "color": "primary" as const,
      "variant": "outline" as const,
      "class": "text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/50"
    },
    {
      "color": "secondary" as const,
      "variant": "outline" as const,
      "class": "text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/50"
    },
    {
      "color": "success" as const,
      "variant": "outline" as const,
      "class": "text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/50"
    },
    {
      "color": "info" as const,
      "variant": "outline" as const,
      "class": "text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/50"
    },
    {
      "color": "warning" as const,
      "variant": "outline" as const,
      "class": "text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/50"
    },
    {
      "color": "error" as const,
      "variant": "outline" as const,
      "class": "text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/50"
    },
    {
      "color": "primary" as const,
      "variant": "soft" as const,
      "class": "bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]"
    },
    {
      "color": "secondary" as const,
      "variant": "soft" as const,
      "class": "bg-[var(--ui-secondary)]/10 text-[var(--ui-secondary)]"
    },
    {
      "color": "success" as const,
      "variant": "soft" as const,
      "class": "bg-[var(--ui-success)]/10 text-[var(--ui-success)]"
    },
    {
      "color": "info" as const,
      "variant": "soft" as const,
      "class": "bg-[var(--ui-info)]/10 text-[var(--ui-info)]"
    },
    {
      "color": "warning" as const,
      "variant": "soft" as const,
      "class": "bg-[var(--ui-warning)]/10 text-[var(--ui-warning)]"
    },
    {
      "color": "error" as const,
      "variant": "soft" as const,
      "class": "bg-[var(--ui-error)]/10 text-[var(--ui-error)]"
    },
    {
      "color": "primary" as const,
      "variant": "subtle" as const,
      "class": "bg-[var(--ui-primary)]/10 text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/25"
    },
    {
      "color": "secondary" as const,
      "variant": "subtle" as const,
      "class": "bg-[var(--ui-secondary)]/10 text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/25"
    },
    {
      "color": "success" as const,
      "variant": "subtle" as const,
      "class": "bg-[var(--ui-success)]/10 text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/25"
    },
    {
      "color": "info" as const,
      "variant": "subtle" as const,
      "class": "bg-[var(--ui-info)]/10 text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/25"
    },
    {
      "color": "warning" as const,
      "variant": "subtle" as const,
      "class": "bg-[var(--ui-warning)]/10 text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/25"
    },
    {
      "color": "error" as const,
      "variant": "subtle" as const,
      "class": "bg-[var(--ui-error)]/10 text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/25"
    },
    {
      "color": "neutral" as const,
      "variant": "solid" as const,
      "class": "text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]"
    },
    {
      "color": "neutral" as const,
      "variant": "outline" as const,
      "class": "ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg)]"
    },
    {
      "color": "neutral" as const,
      "variant": "soft" as const,
      "class": "text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]"
    },
    {
      "color": "neutral" as const,
      "variant": "subtle" as const,
      "class": "ring ring-inset ring-[var(--ui-border-accented)] text-[var(--ui-text)] bg-[var(--ui-bg-elevated)]"
    }
  ],
  "defaultVariants": {
    "color": "primary" as const,
    "variant": "solid" as const,
    "size": "md" as const
  }
}