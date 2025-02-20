export default {
  "slots": {
    "root": "relative overflow-hidden w-full rounded-[calc(var(--ui-radius)*2)] p-4 flex gap-2.5",
    "wrapper": "min-w-0 flex-1 flex flex-col gap-1",
    "title": "text-sm font-medium",
    "description": "text-sm opacity-90",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "close": "p-0.5"
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
    "multiline": {
      "true": {
        "root": "items-start",
        "actions": "items-start mt-1"
      },
      "false": {
        "root": "items-center",
        "actions": "items-center"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as const,
      "variant": "solid" as const,
      "class": {
        "root": "bg-[var(--ui-primary)] text-[var(--ui-bg)]"
      }
    },
    {
      "color": "secondary" as const,
      "variant": "solid" as const,
      "class": {
        "root": "bg-[var(--ui-secondary)] text-[var(--ui-bg)]"
      }
    },
    {
      "color": "success" as const,
      "variant": "solid" as const,
      "class": {
        "root": "bg-[var(--ui-success)] text-[var(--ui-bg)]"
      }
    },
    {
      "color": "info" as const,
      "variant": "solid" as const,
      "class": {
        "root": "bg-[var(--ui-info)] text-[var(--ui-bg)]"
      }
    },
    {
      "color": "warning" as const,
      "variant": "solid" as const,
      "class": {
        "root": "bg-[var(--ui-warning)] text-[var(--ui-bg)]"
      }
    },
    {
      "color": "error" as const,
      "variant": "solid" as const,
      "class": {
        "root": "bg-[var(--ui-error)] text-[var(--ui-bg)]"
      }
    },
    {
      "color": "primary" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/25"
      }
    },
    {
      "color": "secondary" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/25"
      }
    },
    {
      "color": "success" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/25"
      }
    },
    {
      "color": "info" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/25"
      }
    },
    {
      "color": "warning" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/25"
      }
    },
    {
      "color": "error" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/25"
      }
    },
    {
      "color": "primary" as const,
      "variant": "soft" as const,
      "class": {
        "root": "bg-[var(--ui-primary)]/10 text-[var(--ui-primary)]"
      }
    },
    {
      "color": "secondary" as const,
      "variant": "soft" as const,
      "class": {
        "root": "bg-[var(--ui-secondary)]/10 text-[var(--ui-secondary)]"
      }
    },
    {
      "color": "success" as const,
      "variant": "soft" as const,
      "class": {
        "root": "bg-[var(--ui-success)]/10 text-[var(--ui-success)]"
      }
    },
    {
      "color": "info" as const,
      "variant": "soft" as const,
      "class": {
        "root": "bg-[var(--ui-info)]/10 text-[var(--ui-info)]"
      }
    },
    {
      "color": "warning" as const,
      "variant": "soft" as const,
      "class": {
        "root": "bg-[var(--ui-warning)]/10 text-[var(--ui-warning)]"
      }
    },
    {
      "color": "error" as const,
      "variant": "soft" as const,
      "class": {
        "root": "bg-[var(--ui-error)]/10 text-[var(--ui-error)]"
      }
    },
    {
      "color": "primary" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "bg-[var(--ui-primary)]/10 text-[var(--ui-primary)] ring ring-inset ring-[var(--ui-primary)]/25"
      }
    },
    {
      "color": "secondary" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "bg-[var(--ui-secondary)]/10 text-[var(--ui-secondary)] ring ring-inset ring-[var(--ui-secondary)]/25"
      }
    },
    {
      "color": "success" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "bg-[var(--ui-success)]/10 text-[var(--ui-success)] ring ring-inset ring-[var(--ui-success)]/25"
      }
    },
    {
      "color": "info" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "bg-[var(--ui-info)]/10 text-[var(--ui-info)] ring ring-inset ring-[var(--ui-info)]/25"
      }
    },
    {
      "color": "warning" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "bg-[var(--ui-warning)]/10 text-[var(--ui-warning)] ring ring-inset ring-[var(--ui-warning)]/25"
      }
    },
    {
      "color": "error" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "bg-[var(--ui-error)]/10 text-[var(--ui-error)] ring ring-inset ring-[var(--ui-error)]/25"
      }
    },
    {
      "color": "neutral" as const,
      "variant": "solid" as const,
      "class": {
        "root": "text-[var(--ui-bg)] bg-[var(--ui-bg-inverted)]"
      }
    },
    {
      "color": "neutral" as const,
      "variant": "outline" as const,
      "class": {
        "root": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg)] ring ring-inset ring-[var(--ui-border)]"
      }
    },
    {
      "color": "neutral" as const,
      "variant": "soft" as const,
      "class": {
        "root": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)]/50"
      }
    },
    {
      "color": "neutral" as const,
      "variant": "subtle" as const,
      "class": {
        "root": "text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)]/50 ring ring-inset ring-[var(--ui-border-accented)]"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as const,
    "variant": "solid" as const
  }
}