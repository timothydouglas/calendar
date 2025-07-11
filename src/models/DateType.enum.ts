export enum DateType {
  DAY = 'days',
  WEEK = 'weeks',
  MONTH = 'months'
}

export const DateTypes: Record<DateType, string> = {
  [DateType.DAY]: 'Day',
  [DateType.WEEK]: 'Week',
  [DateType.MONTH]: 'Month'
};
