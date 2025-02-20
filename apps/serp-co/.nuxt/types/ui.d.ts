import * as ui from '#build/ui'
import type { DeepPartial } from '#ui/types/utils'
import colors from 'tailwindcss/colors'

const icons = {"arrowLeft":"i-lucide-arrow-left","arrowRight":"i-lucide-arrow-right","check":"i-lucide-check","chevronDoubleLeft":"i-lucide-chevrons-left","chevronDoubleRight":"i-lucide-chevrons-right","chevronDown":"i-lucide-chevron-down","chevronLeft":"i-lucide-chevron-left","chevronRight":"i-lucide-chevron-right","chevronUp":"i-lucide-chevron-up","close":"i-lucide-x","ellipsis":"i-lucide-ellipsis","external":"i-lucide-arrow-up-right","loading":"i-lucide-refresh-cw","minus":"i-lucide-minus","plus":"i-lucide-plus","search":"i-lucide-search"};

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor>

type AppConfigUI = {
  colors?: {
    primary?: Color
		secondary?: Color
		success?: Color
		info?: Color
		warning?: Color
		error?: Color
    neutral?: NeutralColor
  }
  icons?: Partial<typeof icons>
} & DeepPartial<typeof ui>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: AppConfigUI
  }
}

export {}
