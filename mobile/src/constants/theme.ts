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
    background: '#0B1220',
    surface: '#111C30',
    backgroundElement: '#17233A',
    backgroundSelected: '#1E3A8A',
    primary: '#60A5FA',
    primaryDark: '#020617',
    cyan: '#22D3EE',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    border: '#24324A',
    muted: '#64748B',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
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
