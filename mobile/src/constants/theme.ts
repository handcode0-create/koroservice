import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0B1220',
    textSecondary: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    backgroundElement: '#EEF4FF',
    backgroundSelected: '#DBEAFE',
    primary: '#2563EB',
    primaryDark: '#0B1220',
    cyan: '#22D3EE',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    border: '#E2E8F0',
    muted: '#94A3B8',
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    background: '#08111F',
    surface: '#111C30',
    backgroundElement: '#17233A',
    backgroundSelected: '#2553B4',
    primary: '#5A9BFF',
    primaryDark: '#0C182A',
    cyan: '#22D3EE',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
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
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 72, android: 88 }) ?? 80;
export const MaxContentWidth = 720;
