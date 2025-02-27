import * as React from 'react';

import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Slot } from '@radix-ui/react-slot';

// Типы для кнопки
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

// Варианты кнопок
const buttonVariants = {
  default: (theme: Theme) => css`
    background-color: ${theme.colors.accent};
    color: ${theme.colors.accentForeground};
    & svg {
      color: ${theme.colors.accentForeground};
    }
    &:hover {
      background-color: #016ca1; /* 90% от основного цвета */
    }
  `,
  destructive: (theme: Theme) => css`
    background-color: ${theme.colors.destructive};
    color: ${theme.colors.destructiveForeground};
    & svg {
      color: ${theme.colors.destructiveForeground};
    }
    &:hover {
      background-color: #e60000; /* 90% от основного цвета */
    }
  `,
  outline: (theme: Theme) => css`
    border: 1px solid ${theme.colors.border};
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};
    & svg {
      color: ${theme.colors.primary};
    }
    &:hover {
      background-color: ${theme.colors.accent};
      color: ${theme.colors.accentForeground};
      border-color: ${theme.colors.accent};
    }
  `,
  secondary: (theme: Theme) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.secondaryForeground};
    & svg {
      color: ${theme.colors.secondaryForeground};
    }
    &:hover {
      background-color: #666566; /* 80% от основного цвета */
    }
  `,
  ghost: (theme: Theme) => css`
    background-color: transparent;
    color: ${theme.colors.primary};
    & svg {
      color: ${theme.colors.primary};
    }
    &:hover {
      background-color: ${theme.colors.accent};
      color: ${theme.colors.accentForeground};
    }
  `,
  link: (theme: Theme) => css`
    background-color: transparent;
    color: ${theme.colors.primary};
    & svg {
      color: ${theme.colors.primary};
    }
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover {
      text-decoration: none;
    }
  `,
};

// Размеры кнопок
const buttonSizes = {
  default: css`
    height: 2.5rem;
    padding: 0 0.75rem;
  `,
  sm: css`
    height: 2.25rem;
    padding: 0 0.75rem;
  `,
  lg: css`
    height: 2.75rem;
    padding: 0 2rem;
  `,
  icon: css`
    height: 2.5rem;
    width: 2.5rem;
    padding: 0;
  `,
};

// Базовые стили кнопки с использованием темы
const ButtonBase = styled.button<{
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: ${(props) => props.theme.borderRadius.radius};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
  outline: none;
  cursor: pointer;
  border: none;
  line-height: 1.5;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  /* Применяем стили для выбранного варианта и размера */
  ${(props) => buttonVariants[props.variant || 'default'](props.theme)}
  ${(props) => buttonSizes[props.size || 'default']}
`;

// Компонент кнопки
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : ButtonBase;

    return (
      <Comp
        variant={variant}
        size={size}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
