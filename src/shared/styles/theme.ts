import { borderRadius, colors, fontSize, fontWeight, spacing } from './tokens';

// Определение типа темы для Emotion
export interface Theme {
  colors: typeof colors;
  borderRadius: typeof borderRadius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  spacing: typeof spacing;
}

// Создаем тему для Emotion
export const theme: Theme = {
  colors,
  borderRadius,
  fontSize,
  fontWeight,
  spacing,
};

// Вспомогательные типы для использования темы в компонентах
export type ThemeColors = keyof typeof colors;
export type ThemeBorderRadius = keyof typeof borderRadius;
export type ThemeFontSize = keyof typeof fontSize;
export type ThemeFontWeight = keyof typeof fontWeight;
export type ThemeSpacing = keyof typeof spacing;
