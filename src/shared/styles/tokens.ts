export const colors = {
  background: 'rgba(255, 255, 255, 1)',
  foreground: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(245, 245, 245, 1)',
  mutedForeground: '#6b7280',
  popover: 'rgba(255, 255, 255, 1)',
  popoverForeground: 'rgba(55, 65, 81, 1)',
  border: '#E7E7E7',
  input: 'rgba(230, 230, 230, 1)',
  card: '#F5FAFF',
  cardForeground: '#373741',
  primary: '#373741',
  primaryForeground: 'rgba(255, 255, 255, 1)',
  secondary: '#7F7E7F',
  secondaryForeground: 'rgba(17, 24, 39, 1)',
  accent: '#018ED7',
  accentForeground: '#FFFFFF',
  brand: '#ffe681',
  destructive: 'rgba(255, 0, 0, 1)',
  destructiveForeground: 'rgba(255, 255, 255, 1)',
  ring: 'rgba(180, 180, 180, 1)',
};

export const borderRadius = {
  radius: '0.5rem',
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
};

export const animation = {
  accordionDown: 'accordion-down 0.2s ease-out',
  accordionUp: 'accordion-up 0.2s ease-out',
};

export const keyframes = {
  accordionDown: {
    from: {
      height: '0',
    },
    to: {
      height: 'var(--radix-accordion-content-height)',
    },
  },
  accordionUp: {
    from: {
      height: 'var(--radix-accordion-content-height)',
    },
    to: {
      height: '0',
    },
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export default {
  colors,
  borderRadius,
  animation,
  keyframes,
  spacing,
  fontSize,
  fontWeight,
};
