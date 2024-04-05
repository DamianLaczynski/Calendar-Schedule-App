export const CALENDAR_VIEW_TYPE = {
    MONTH_VIEW: "MONTH_VIEW",
    WEEK_VIEW: "WEEK_VIEW",
    DAY_VIEW: "DAY_VIEW",
    LIST_VIEW: "LIST_VIEW"
  } as const;

  export type CalendarViewType = keyof typeof CALENDAR_VIEW_TYPE;