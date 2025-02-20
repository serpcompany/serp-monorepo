export default {
  "slots": {
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0 rounded-[var(--ui-radius)]",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-[var(--ui-text-dimmed)]",
    "childList": "",
    "childItem": "",
    "childLink": "group size-full px-3 py-2 rounded-[calc(var(--ui-radius)*1.5)] flex items-start gap-2 text-start",
    "childLinkWrapper": "flex flex-col items-start",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "font-semibold text-sm relative inline-flex",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-[var(--ui-text-dimmed)]",
    "childLinkDescription": "text-sm text-[var(--ui-text-muted)]",
    "separator": "px-2 h-px bg-[var(--ui-border)]",
    "viewportWrapper": "absolute top-full left-0 flex w-full justify-center",
    "viewport": "relative overflow-hidden bg-[var(--ui-bg)] shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-[var(--ui-border)] h-[var(--reka-navigation-menu-viewport-height)] w-full transition-[width,height] origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]",
    "content": "absolute top-0 left-0 w-full data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]",
    "indicator": "data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] bottom-0 z-[1] flex h-2.5 items-end justify-center overflow-hidden transition-transform duration-200 ease-out",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-[var(--ui-border)] bg-[var(--ui-bg)] z-[1] rounded-[calc(var(--ui-radius)/2)]"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-[var(--ui-primary)]",
        "childLink": "focus-visible:outline-[var(--ui-primary)]"
      },
      "secondary": {
        "link": "focus-visible:before:ring-[var(--ui-secondary)]",
        "childLink": "focus-visible:outline-[var(--ui-secondary)]"
      },
      "success": {
        "link": "focus-visible:before:ring-[var(--ui-success)]",
        "childLink": "focus-visible:outline-[var(--ui-success)]"
      },
      "info": {
        "link": "focus-visible:before:ring-[var(--ui-info)]",
        "childLink": "focus-visible:outline-[var(--ui-info)]"
      },
      "warning": {
        "link": "focus-visible:before:ring-[var(--ui-warning)]",
        "childLink": "focus-visible:outline-[var(--ui-warning)]"
      },
      "error": {
        "link": "focus-visible:before:ring-[var(--ui-error)]",
        "childLink": "focus-visible:outline-[var(--ui-error)]"
      },
      "neutral": {
        "link": "focus-visible:before:ring-[var(--ui-border-inverted)]",
        "childLink": "focus-visible:outline-[var(--ui-border-inverted)]"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "w-full items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid grid-cols-2 gap-2 p-2"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
        "childList": "ms-5 border-s border-[var(--ui-border)]",
        "childItem": "ps-1.5 -ms-px"
      }
    },
    "active": {
      "true": {
        "childLink": "bg-[var(--ui-bg-elevated)] text-[var(--ui-text-highlighted)]",
        "childLinkIcon": "text-[var(--ui-text)]"
      },
      "false": {
        "link": "text-[var(--ui-text-muted)]",
        "linkLeadingIcon": "text-[var(--ui-text-dimmed)]",
        "childLink": [
          "hover:bg-[var(--ui-bg-elevated)]/50 text-[var(--ui-text)] hover:text-[var(--ui-text-highlighted)]",
          "transition-colors"
        ],
        "childLinkIcon": [
          "text-[var(--ui-text-dimmed)] group-hover:text-[var(--ui-text)]",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "highlight": true,
      "orientation": "horizontal" as const,
      "class": {
        "item": "-mb-px",
        "link": "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full"
      }
    },
    {
      "highlight": true,
      "orientation": "vertical" as const,
      "class": {
        "item": "px-1.5 -ms-px",
        "link": "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full"
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill" as const,
      "class": {
        "link": [
          "hover:text-[var(--ui-text-highlighted)] hover:before:bg-[var(--ui-bg-elevated)]/50 data-[state=open]:text-[var(--ui-text-highlighted)]",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-[var(--ui-text)] group-data-[state=open]:text-[var(--ui-text)]",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "variant": "pill" as const,
      "highlight": true,
      "orientation": "horizontal" as const,
      "class": {
        "link": "data-[state=open]:before:bg-[var(--ui-bg-elevated)]/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill" as const,
      "highlight": false,
      "active": false,
      "orientation": "horizontal" as const,
      "class": {
        "link": "data-[state=open]:before:bg-[var(--ui-bg-elevated)]/50"
      }
    },
    {
      "color": "primary" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-primary)]",
        "linkLeadingIcon": "text-[var(--ui-primary)]"
      }
    },
    {
      "color": "secondary" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-secondary)]",
        "linkLeadingIcon": "text-[var(--ui-secondary)]"
      }
    },
    {
      "color": "success" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-success)]",
        "linkLeadingIcon": "text-[var(--ui-success)]"
      }
    },
    {
      "color": "info" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-info)]",
        "linkLeadingIcon": "text-[var(--ui-info)]"
      }
    },
    {
      "color": "warning" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-warning)]",
        "linkLeadingIcon": "text-[var(--ui-warning)]"
      }
    },
    {
      "color": "error" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-error)]",
        "linkLeadingIcon": "text-[var(--ui-error)]"
      }
    },
    {
      "color": "neutral" as const,
      "variant": "pill" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-text-highlighted)]",
        "linkLeadingIcon": "text-[var(--ui-text-highlighted)]"
      }
    },
    {
      "variant": "pill" as const,
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-[var(--ui-bg-elevated)]"
      }
    },
    {
      "variant": "pill" as const,
      "active": true,
      "highlight": true,
      "class": {
        "link": [
          "hover:before:bg-[var(--ui-bg-elevated)]/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link" as const,
      "class": {
        "link": [
          "hover:text-[var(--ui-text-highlighted)] data-[state=open]:text-[var(--ui-text-highlighted)]",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-[var(--ui-text)] group-data-[state=open]:text-[var(--ui-text)]",
          "transition-colors"
        ]
      }
    },
    {
      "color": "primary" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-primary)]",
        "linkLeadingIcon": "text-[var(--ui-primary)]"
      }
    },
    {
      "color": "secondary" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-secondary)]",
        "linkLeadingIcon": "text-[var(--ui-secondary)]"
      }
    },
    {
      "color": "success" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-success)]",
        "linkLeadingIcon": "text-[var(--ui-success)]"
      }
    },
    {
      "color": "info" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-info)]",
        "linkLeadingIcon": "text-[var(--ui-info)]"
      }
    },
    {
      "color": "warning" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-warning)]",
        "linkLeadingIcon": "text-[var(--ui-warning)]"
      }
    },
    {
      "color": "error" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-error)]",
        "linkLeadingIcon": "text-[var(--ui-error)]"
      }
    },
    {
      "color": "neutral" as const,
      "variant": "link" as const,
      "active": true,
      "class": {
        "link": "text-[var(--ui-text-highlighted)]",
        "linkLeadingIcon": "text-[var(--ui-text-highlighted)]"
      }
    },
    {
      "highlightColor": "primary" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-primary)]"
      }
    },
    {
      "highlightColor": "secondary" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-secondary)]"
      }
    },
    {
      "highlightColor": "success" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-success)]"
      }
    },
    {
      "highlightColor": "info" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-info)]"
      }
    },
    {
      "highlightColor": "warning" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-warning)]"
      }
    },
    {
      "highlightColor": "error" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-error)]"
      }
    },
    {
      "highlightColor": "neutral" as const,
      "highlight": true,
      "active": true,
      "class": {
        "link": "after:bg-[var(--ui-bg-inverted)]"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as const,
    "highlightColor": "primary" as const,
    "variant": "pill" as const
  }
}