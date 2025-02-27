'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

// Стилизованный контент попапа
const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  z-index: 200;
  width: 18rem; /* w-72 */
  border-radius: ${(props) => props.theme.borderRadius.radius};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.popover};
  color: ${(props) => props.theme.colors.popoverForeground};
  padding: ${(props) => props.theme.spacing[4]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;

  /* Анимации */
  &[data-state='open'] {
    animation: fadeIn 150ms ease-out;
  }
  &[data-state='closed'] {
    animation: fadeOut 150ms ease-in;
  }

  /* Позиционирование */
  &[data-side='bottom'] {
    transform-origin: top;
  }
  &[data-side='left'] {
    transform-origin: right;
  }
  &[data-side='right'] {
    transform-origin: left;
  }
  &[data-side='top'] {
    transform-origin: bottom;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <StyledPopoverContent
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={className}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
