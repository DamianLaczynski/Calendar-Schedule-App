export const PAGE_NAV_ACTION = {
  NEXT_PAGE: 'NEXT_PAGE',
  PREVIOUS_PAGE: 'PREVIOUS_PAGE',
} as const;

export type PageNavAction = keyof typeof PAGE_NAV_ACTION;
