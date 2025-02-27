'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

// Стилизованный оверлей
const StyledSheetOverlay = styled(SheetPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);

  &[data-state='open'] {
    animation: fadeIn 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: fadeOut 200ms ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <StyledSheetOverlay {...props} ref={ref} className={className} />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// Стилизованный контент для разных сторон
interface StyledContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
}

const StyledSheetContent = styled(SheetPrimitive.Content)<StyledContentProps>`
  position: fixed;
  z-index: 100;
  display: grid;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  padding: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-in-out;

  ${(props) => {
    switch (props.side) {
      case 'top':
        return `
          inset-inline: 0;
          top: 0;
          border-bottom: 1px solid ${props.theme.colors.border};
          
          &[data-state='closed'] {
            animation: slideOutToTop 300ms ease-in;
          }
          
          &[data-state='open'] {
            animation: slideInFromTop 500ms ease-out;
          }
          
          @keyframes slideOutToTop {
            from { transform: translateY(0); }
            to { transform: translateY(-100%); }
          }
          
          @keyframes slideInFromTop {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
        `;
      case 'bottom':
        return `
          inset-inline: 0;
          bottom: 0;
          border-top: 1px solid ${props.theme.colors.border};
          
          &[data-state='closed'] {
            animation: slideOutToBottom 300ms ease-in;
          }
          
          &[data-state='open'] {
            animation: slideInFromBottom 500ms ease-out;
          }
          
          @keyframes slideOutToBottom {
            from { transform: translateY(0); }
            to { transform: translateY(100%); }
          }
          
          @keyframes slideInFromBottom {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `;
      case 'left':
        return `
          inset-block: 0;
          left: 0;
          height: 100%;
          width: 75%;
          border-right: 1px solid ${props.theme.colors.border};
          
          @media (min-width: 640px) {
            max-width: 24rem;
          }
          
          &[data-state='closed'] {
            animation: slideOutToLeft 300ms ease-in;
          }
          
          &[data-state='open'] {
            animation: slideInFromLeft 500ms ease-out;
          }
          
          @keyframes slideOutToLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          
          @keyframes slideInFromLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `;
      case 'right':
      default:
        return `
          inset-block: 0;
          right: 0;
          height: 100%;
          width: 75%;
          border-left: 1px solid ${props.theme.colors.border};
          
          @media (min-width: 640px) {
            max-width: 24rem;
          }
          
          &[data-state='closed'] {
            animation: slideOutToRight 300ms ease-in;
          }
          
          &[data-state='open'] {
            animation: slideInFromRight 500ms ease-out;
          }
          
          @keyframes slideOutToRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
          }
          
          @keyframes slideInFromRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `;
    }
  }}
`;

// Стилизованная кнопка закрытия
const StyledCloseButton = styled(SheetPrimitive.Close)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  opacity: 0.7;
  transition-property: opacity;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.ring};
  }

  &:disabled {
    pointer-events: none;
  }

  &[data-state='open'] {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

// Стилизованная иконка X
const StyledXIcon = styled(X)`
  height: 1rem;
  width: 1rem;
`;

// Скрытый текст для читалок
const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: 'top' | 'bottom' | 'left' | 'right';
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <StyledSheetContent ref={ref} side={side} className={className} {...props}>
      {children}
      <StyledCloseButton>
        <StyledXIcon />
        <ScreenReaderOnly>Close</ScreenReaderOnly>
      </StyledCloseButton>
    </StyledSheetContent>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

// Стилизованный заголовок
const StyledSheetHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <StyledSheetHeader className={className} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

// Стилизованный футер
const StyledSheetFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;

    & > * + * {
      margin-left: 0.5rem;
    }
  }
`;

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <StyledSheetFooter className={className} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

// Стилизованный заголовок
const StyledSheetTitle = styled(SheetPrimitive.Title)`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  color: ${(props) => props.theme.colors.foreground};
`;

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <StyledSheetTitle ref={ref} className={className} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

// Стилизованное описание
const StyledSheetDescription = styled(SheetPrimitive.Description)`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <StyledSheetDescription ref={ref} className={className} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
