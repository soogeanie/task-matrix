export const BUTTON_STYLES = {
  BASE: 'base',
  COLORS: 'colors',
  STYLE: 'style'
} as const

export const BUTTON_TYPES = {
  ROUNDED: 'rounded',
  ICON_ONLY: 'iconOnly'
} as const

export const BUTTON_COLORS = {
  GREEN: 'green',
  PURPLE: 'purple',
  RED: 'red'
} as const

export const COLOR_STYLES = {
  [BUTTON_TYPES.ROUNDED]: {
    [BUTTON_COLORS.GREEN]: '',
    [BUTTON_COLORS.PURPLE]: 'text-purple-950 bg-purple-300 hover:bg-purple-200 focus-visible:outline-purple-300',
    [BUTTON_COLORS.RED]: ''
  },
  [BUTTON_TYPES.ICON_ONLY]: {
    [BUTTON_COLORS.GREEN]: 'text-emerald-800 hover:text-emerald-700 focus-visible:outline-indigo-800',
    [BUTTON_COLORS.PURPLE]: '',
    [BUTTON_COLORS.RED]: 'text-red-700 hover:text-red-600 focus-visible:outline-indigo-700'
  }
}

export const TYPES_STYLES = {
  [BUTTON_TYPES.ROUNDED]: 'text-lg font-bold px-10 py-2 disabled:bg-gray-200 disabled:text-gray-400',
  [BUTTON_TYPES.ICON_ONLY]: 'disabled:text-gray-300',
}

export const BUTTON_CLASSES = {
  [BUTTON_STYLES.BASE]: 'rounded-full shadow-sm disabled:pointer-events-none disabled:cursor-not-allowed focus-visible:outline focus:visible-outline-2',
  [BUTTON_STYLES.COLORS]: COLOR_STYLES,
  [BUTTON_STYLES.STYLE]: TYPES_STYLES
}