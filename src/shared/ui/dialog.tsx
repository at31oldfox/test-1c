'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

// Стилизованный оверлей
const StyledDialogOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);

  &[data-state='open'] {
    animation: fadeIn 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: fadeOut 150ms ease-in;
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

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <StyledDialogOverlay ref={ref} className={className} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Стилизованный контент диалога
const StyledDialogContent = styled(DialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem; /* max-w-lg */
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  padding: 1.5rem; /* p-6 */
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition-duration: 200ms;

  &[data-state='open'] {
    animation: dialogIn 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: dialogOut 200ms ease-in;
  }

  @media (min-width: 640px) {
    border-radius: ${(props) => props.theme.borderRadius.lg};
  }

  @keyframes dialogIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes dialogOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
  }
`;

// Стилизованная кнопка закрытия
const StyledCloseButton = styled(DialogPrimitive.Close)`
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
  }

  &:disabled {
    pointer-events: none;
  }

  &[data-state='open'] {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.mutedForeground};
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

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <StyledDialogContent ref={ref} className={className} {...props}>
      {children}
      <StyledCloseButton>
        <StyledXIcon />
        <ScreenReaderOnly>Close</ScreenReaderOnly>
      </StyledCloseButton>
    </StyledDialogContent>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Стилизованный заголовок диалога
const StyledDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <StyledDialogHeader className={className} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

// Стилизованный футер диалога
const StyledDialogFooter = styled.div`
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

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <StyledDialogFooter className={className} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

// Стилизованный заголовок
const StyledDialogTitle = styled(DialogPrimitive.Title)`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  line-height: 1;
  letter-spacing: -0.025em;
`;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <StyledDialogTitle ref={ref} className={className} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Стилизованное описание
const StyledDialogDescription = styled(DialogPrimitive.Description)`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <StyledDialogDescription ref={ref} className={className} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
