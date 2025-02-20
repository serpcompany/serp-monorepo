export default {
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-[var(--ui-bg-accented)] overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-[var(--ui-bg)] ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-[var(--ui-primary)]",
        "thumb": "ring-[var(--ui-primary)] focus-visible:outline-[var(--ui-primary)]/50"
      },
      "secondary": {
        "range": "bg-[var(--ui-secondary)]",
        "thumb": "ring-[var(--ui-secondary)] focus-visible:outline-[var(--ui-secondary)]/50"
      },
      "success": {
        "range": "bg-[var(--ui-success)]",
        "thumb": "ring-[var(--ui-success)] focus-visible:outline-[var(--ui-success)]/50"
      },
      "info": {
        "range": "bg-[var(--ui-info)]",
        "thumb": "ring-[var(--ui-info)] focus-visible:outline-[var(--ui-info)]/50"
      },
      "warning": {
        "range": "bg-[var(--ui-warning)]",
        "thumb": "ring-[var(--ui-warning)] focus-visible:outline-[var(--ui-warning)]/50"
      },
      "error": {
        "range": "bg-[var(--ui-error)]",
        "thumb": "ring-[var(--ui-error)] focus-visible:outline-[var(--ui-error)]/50"
      },
      "neutral": {
        "range": "bg-[var(--ui-bg-inverted)]",
        "thumb": "ring-[var(--ui-border-inverted)] focus-visible:outline-[var(--ui-border-inverted)]/50"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as const,
      "size": "xs" as const,
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "sm" as const,
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "md" as const,
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "lg" as const,
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "xl" as const,
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "xs" as const,
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "sm" as const,
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "md" as const,
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "lg" as const,
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "xl" as const,
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as const,
    "color": "primary" as const
  }
}