'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

// Стилизованный разделитель
const StyledSeparator = styled(SeparatorPrimitive.Root)<{
  orientation?: 'horizontal' | 'vertical';
}>`
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.border};

  ${(props) =>
    props.orientation === 'horizontal'
      ? `
      height: 1px;
      width: 100%;
    `
      : `
      height: 100%;
      width: 1px;
    `}
`;

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <StyledSeparator
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={className}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
