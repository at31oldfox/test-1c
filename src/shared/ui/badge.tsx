import * as React from 'react';

import styled from '@emotion/styled';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

// Создаем базовый стилизованный компонент для badge
const BaseBadge = styled.div<{ variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px; /* rounded-full */
  border: 1px solid;
  padding: 0.125rem 0.625rem; /* px-2.5 py-0.5 */
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  transition: colors 0.2s;

  &:focus {
    outline: none;
  }

  /* Варианты стилей для разных типов badge */
  ${(props) => {
    switch (props.variant) {
      case 'default':
        return `
          border-color: transparent;
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.primaryForeground};
          &:hover {
            background-color: rgba(55, 55, 65, 0.8); /* primary/80 */
          }
        `;
      case 'secondary':
        return `
          border-color: transparent;
          background-color: ${props.theme.colors.secondary};
          color: ${props.theme.colors.secondaryForeground};
          &:hover {
            background-color: rgba(127, 126, 127, 0.8); /* secondary/80 */
          }
        `;
      case 'destructive':
        return `
          border-color: transparent;
          background-color: ${props.theme.colors.destructive};
          color: ${props.theme.colors.destructiveForeground};
          &:hover {
            background-color: rgba(255, 0, 0, 0.8); /* destructive/80 */
          }
        `;
      case 'outline':
        return `
          border-color: ${props.theme.colors.border};
          background-color: transparent;
          color: ${props.theme.colors.foreground};
        `;
      default:
        return '';
    }
  }}
`;

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <BaseBadge variant={variant} className={className} {...props} />;
}

export { Badge };
