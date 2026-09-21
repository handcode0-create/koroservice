import '@/global.css';

import { Platform } from 'react-native';

import {
  KoroColors,
  KoroIconSize,
  KoroLayout,
  KoroRadius,
  KoroSpacing,
  KoroTypography,
} from '@/design-system/tokens';

export const Colors = {
  light: {
    text: KoroColors.text,
    textSecondary: KoroColors.textSecondary,
    background: KoroColors.background,
    surface: KoroColors.surface,
    backgroundElement: KoroColors.blueSoft,
    backgroundSelected: KoroColors.blueMuted,
    primary: KoroColors.blue,
    primaryDark: KoroColors.navy,
    cyan: KoroColors.cyan,
    success: '#22C55E',
    warning: '#F59E0B',
    danger: KoroColors.red,
    border: KoroColors.border,
    muted: KoroColors.textMuted,
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    background: KoroColors.navyStrong,
    surface: '#111C30',
    backgroundElement: '#17233A',
    backgroundSelected: '#2553B4',
    primary: '#5A9BFF',
    primaryDark: KoroColors.navyStrong,
    cyan: KoroColors.cyan,
    success: '#22C55E',
    warning: '#F59E0B',
    danger: KoroColors.red,
    border: '#23324A',
    muted: '#71819A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Poppins_400Regular',
    serif: 'ui-serif',
    rounded: 'Poppins_500Medium',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Poppins_400Regular',
    serif: 'serif',
    rounded: 'Poppins_500Medium',
    mono: 'monospace',
  },
  web: {
    sans: 'Poppins_400Regular',
    serif: 'var(--font-serif)',
    rounded: 'Poppins_500Medium',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: KoroSpacing.xs,
  two: KoroSpacing.sm,
  three: KoroSpacing.lg,
  four: KoroSpacing['2xl'],
  five: KoroSpacing['3xl'],
  six: 64,
} as const;

export const Radius = {
  sm: KoroRadius.sm,
  md: KoroRadius.md,
  lg: KoroRadius.xl,
  pill: KoroRadius.pill,
} as const;

export const IconSize = KoroIconSize;
export const Layout = KoroLayout;
export const Typography = KoroTypography;
export const MaxContentWidth = 720;
export const BottomTabInset = KoroLayout.bottomNavHeight;
