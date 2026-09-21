export const KoroColors = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  navy: '#0B1E3A',
  navyStrong: '#07172E',
  blue: '#1D68DD',
  blueBright: '#2B7BFF',
  blueSoft: '#EAF2FF',
  blueMuted: '#D7E6FF',
  cyan: '#22D3EE',
  yellow: '#FFB020',
  yellowSoft: '#FFF2D8',
  green: '#1FAF6A',
  greenSoft: '#E9F8EF',
  orange: '#F97316',
  purple: '#6B46C1',
  red: '#E5484D',
  text: '#0B1220',
  textSecondary: '#64748B',
  textMuted: '#8C98A8',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const KoroSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const KoroRadius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
} as const;

export const KoroTypography = {
  display: {
    fontFamily: 'Poppins_900Black',
    fontSize: 22,
    lineHeight: 27,
  },
  title: {
    fontFamily: 'Poppins_900Black',
    fontSize: 18,
    lineHeight: 23,
  },
  subtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    lineHeight: 17,
  },
  body: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  bodyStrong: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    lineHeight: 18,
  },
  caption: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 9,
    lineHeight: 14,
  },
  label: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 10,
    lineHeight: 14,
  },
  button: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 10,
    lineHeight: 14,
  },
  nav: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 9,
    lineHeight: 13,
  },
} as const;

export const KoroIconSize = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
} as const;

export const KoroLayout = {
  screenHorizontalPadding: 16,
  sectionGap: 16,
  cardGap: 8,
  bottomNavHeight: 72,
  bannerHeight: 148,
  serviceCardHeight: 91,
} as const;

export const KoroShadow = {
  card: {
    shadowColor: '#0B1220',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  floating: {
    shadowColor: '#0B1220',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
} as const;
