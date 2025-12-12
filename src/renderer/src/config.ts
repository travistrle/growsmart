export const MAX_RECORD_COUNT = 1000
export const DATA_RETENTION_YEARS = 2

export const TIME_FILTERS = {
  SEVEN_DAYS: '7days',
  FOUR_WEEKS: '4weeks',
  ONE_YEAR: '1year'
} as const

export type TimeFilter = (typeof TIME_FILTERS)[keyof typeof TIME_FILTERS]
