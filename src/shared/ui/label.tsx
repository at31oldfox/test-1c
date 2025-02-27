'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as LabelPrimitive from '@radix-ui/react-label';

// Стилизованная метка
const StyledLabel = styled(LabelPrimitive.Root)`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 1;

  &:has(+ :disabled) {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <StyledLabel ref={ref} className={className} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
