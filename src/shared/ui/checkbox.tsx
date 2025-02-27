import * as React from 'react';

import styled from '@emotion/styled';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

// Стилизованный корневой элемент чекбокса
const CheckboxRoot = styled(CheckboxPrimitive.Root)`
  height: 1.25rem;
  width: 1.25rem;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.accent};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state='checked'] {
    background-color: ${(props) => props.theme.colors.brand};
    color: ${(props) => props.theme.colors.primary};
    border: none;
  }
`;

// Стилизованный индикатор чекбокса
const CheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

// Стилизованная иконка
const StyledCheck = styled(Check)`
  height: 1rem;
  width: 1rem;
`;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxRoot ref={ref} className={className} {...props}>
      <CheckboxIndicator>
        <StyledCheck />
      </CheckboxIndicator>
    </CheckboxRoot>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
