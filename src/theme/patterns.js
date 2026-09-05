export const FLEX_PATTERNS = {
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  spaceBetweenStart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  centerCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  columnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export const DETAIL_BOX = {
  borderLeft: '0.25rem solid',
  borderColor: 'primary.main',
  bgcolor: 'grey.50',
  p: 2,
  borderRadius: 1,
};

export const CARD_PATTERNS = {
  bordered: {
    border: '0.0625rem solid',
    borderColor: 'divider',
    borderRadius: 1.5,
    bgcolor: 'background.paper',
  },

  elevated: {
    boxShadow: 1,
    borderRadius: 2,
    bgcolor: 'background.paper',
  },
};

export const ICON_BOX = {
  colored: (color = 'primary') => ({
    p: 1,
    borderRadius: 2,
    bgcolor: `${color}.lighter`,
    color: `${color}.main`,
  }),

  circular: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const TEXT_PATTERNS = {
  uppercaseLabel: {
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.019rem',
  },

  monospace: {
    fontFamily: 'monospace',
    fontSize: '0.75rem',
  },

  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export const LAYOUT_PATTERNS = {
  fullHeight: {
    height: '100vh',
  },

  fullHeightFlex: {
    display: 'flex',
    height: '100vh',
  },

  scrollable: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  grid2Col: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  centeredContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
};

export const SPACING = {
  sectionGap: { gap: 2 },

  compactGap: { gap: 0.5 },

  marginBottom: { mb: 2 },

  padding: { p: 2 },
};

export const COMBINED_PATTERNS = {
  pageHeader: {
    ...FLEX_PATTERNS.spaceBetween,
    mb: 2,
  },

  infoRow: {
    ...FLEX_PATTERNS.centerStart,
    gap: 0.5,
  },

  loadingState: {
    ...FLEX_PATTERNS.columnCenter,
    minHeight: '12.5rem',
    textAlign: 'center',
  },
};

export default {
  FLEX_PATTERNS,
  DETAIL_BOX,
  CARD_PATTERNS,
  ICON_BOX,
  TEXT_PATTERNS,
  LAYOUT_PATTERNS,
  SPACING,
  COMBINED_PATTERNS,
};
