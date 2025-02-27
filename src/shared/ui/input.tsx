import * as React from 'react';

import styled from '@emotion/styled';

// Стилизованный инпут с использованием emotion и темы
const InputBase = styled.input`
  display: flex;
  height: 2.25rem;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.radius};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: transparent;
  padding: 0 0.75rem;
  font-size: ${(props) => props.theme.fontSize.base};
  line-height: 1.5;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &::file-selector-button {
    border: 0;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }

  @media (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return <InputBase type={type} className={className} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';

export { Input };
