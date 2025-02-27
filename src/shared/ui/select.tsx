'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

// Стилизованный триггер селекта
const StyledSelectTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  height: 2.5rem; /* h-10 */
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(props) => props.theme.borderRadius.radius};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  padding: 0.5rem 0.75rem;
  font-size: ${(props) => props.theme.fontSize.sm};

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <StyledSelectTrigger ref={ref} className={className} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown style={{ height: '1rem', width: '1rem', opacity: 0.5 }} />
    </SelectPrimitive.Icon>
  </StyledSelectTrigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Стилизованные кнопки прокрутки
const StyledScrollButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;
`;

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;
`;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <StyledScrollButton ref={ref} className={className} {...props}>
    <ChevronUp style={{ height: '1rem', width: '1rem' }} />
  </StyledScrollButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <StyledScrollDownButton ref={ref} className={className} {...props}>
    <ChevronDown style={{ height: '1rem', width: '1rem' }} />
  </StyledScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

// Стилизованное содержимое селекта
const StyledSelectContent = styled(SelectPrimitive.Content)`
  position: relative;
  z-index: 50;
  max-height: 24rem; /* max-h-96 */
  min-width: 8rem;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.radius};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.popover};
  color: ${(props) => props.theme.colors.popoverForeground};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

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
    &[data-position='popper'] {
      transform: translateY(0.25rem);
    }
  }
  &[data-side='top'] {
    transform-origin: bottom;
    &[data-position='popper'] {
      transform: translateY(-0.25rem);
    }
  }
  &[data-side='left'] {
    transform-origin: right;
    &[data-position='popper'] {
      transform: translateX(-0.25rem);
    }
  }
  &[data-side='right'] {
    transform-origin: left;
    &[data-position='popper'] {
      transform: translateX(0.25rem);
    }
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

// Стилизованный viewport
const StyledViewport = styled(SelectPrimitive.Viewport)`
  padding: 0.25rem;

  &[data-position='popper'] {
    height: var(--radix-select-trigger-height);
    width: 100%;
    min-width: var(--radix-select-trigger-width);
  }
`;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <StyledSelectContent
      ref={ref}
      position={position}
      className={className}
      {...props}
    >
      <SelectScrollUpButton />
      <StyledViewport data-position={position}>{children}</StyledViewport>
      <SelectScrollDownButton />
    </StyledSelectContent>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Стилизованная метка
const StyledSelectLabel = styled(SelectPrimitive.Label)`
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
`;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <StyledSelectLabel ref={ref} className={className} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// Стилизованный элемент списка
const StyledSelectItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: ${(props) => props.theme.fontSize.sm};
  outline: none;

  &:focus {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

// Стиль для индикатора
const ItemIndicatorWrapper = styled.span`
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;
`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <StyledSelectItem ref={ref} className={className} {...props}>
    <ItemIndicatorWrapper>
      <SelectPrimitive.ItemIndicator>
        <Check style={{ height: '1rem', width: '1rem' }} />
      </SelectPrimitive.ItemIndicator>
    </ItemIndicatorWrapper>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectItem>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Стилизованный разделитель
const StyledSelectSeparator = styled(SelectPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: ${(props) => props.theme.colors.muted};
`;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <StyledSelectSeparator ref={ref} className={className} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
