export default {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-[var(--ui-text)] flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-[var(--ui-primary)]"
      },
      "secondary": {
        "border": "border-[var(--ui-secondary)]"
      },
      "success": {
        "border": "border-[var(--ui-success)]"
      },
      "info": {
        "border": "border-[var(--ui-info)]"
      },
      "warning": {
        "border": "border-[var(--ui-warning)]"
      },
      "error": {
        "border": "border-[var(--ui-error)]"
      },
      "neutral": {
        "border": "border-[var(--ui-border)]"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "mx-3 whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": "my-2"
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as const,
      "size": "xs" as const,
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "sm" as const,
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "md" as const,
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "lg" as const,
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal" as const,
      "size": "xl" as const,
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "xs" as const,
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "sm" as const,
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "md" as const,
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "lg" as const,
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical" as const,
      "size": "xl" as const,
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral" as const,
    "size": "xs" as const,
    "type": "solid" as const
  }
}