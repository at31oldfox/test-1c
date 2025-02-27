'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { Dialog, DialogContent } from '@/shared/ui/dialog';

// Стилизованный Command
const StyledCommand = styled(CommandPrimitive)`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.radius};
  background-color: ${(props) => props.theme.colors.popover};
  color: ${(props) => props.theme.colors.popoverForeground};

  /* Добавляем CSS-свойства для вложенных селекторов CMDK */
  & [cmdk-group-heading] {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  & [cmdk-group]:not([hidden]) ~ [cmdk-group] {
    padding-top: 0;
  }

  & [cmdk-group] {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  & [cmdk-input-wrapper] svg {
    height: 1.25rem;
    width: 1.25rem;
  }

  & [cmdk-input] {
    height: 3rem;
  }

  & [cmdk-item] {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  & [cmdk-item] svg {
    height: 1.25rem;
    width: 1.25rem;
  }
`;

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <StyledCommand ref={ref} className={className} {...props} />
));
Command.displayName = CommandPrimitive.displayName;

// Стилизованный DialogContent
const StyledDialogContent = styled(DialogContent)`
  overflow: hidden;
  padding: 0;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <StyledDialogContent>
        <Command>{children}</Command>
      </StyledDialogContent>
    </Dialog>
  );
};

// Стилизованный wrapper для input
const CommandInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
`;

// Стилизованная иконка поиска
const StyledSearchIcon = styled(Search)`
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  opacity: 0.5;
`;

// Стилизованный input
const StyledCommandInput = styled(CommandPrimitive.Input)`
  display: flex;
  height: 2.75rem; /* h-11 */
  width: 100%;
  border: none;
  background-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.sm};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <CommandInputWrapper cmdk-input-wrapper="">
    <StyledSearchIcon />
    <StyledCommandInput ref={ref} className={className} {...props} />
  </CommandInputWrapper>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

// Стилизованный список
const StyledCommandList = styled(CommandPrimitive.List)`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <StyledCommandList ref={ref} className={className} {...props} />
));

CommandList.displayName = CommandPrimitive.List.displayName;

// Стилизованный пустой компонент
const StyledCommandEmpty = styled(CommandPrimitive.Empty)`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <StyledCommandEmpty ref={ref} {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// Стилизованная группа
const StyledCommandGroup = styled(CommandPrimitive.Group)`
  overflow: hidden;
  padding: 0.25rem;
  color: ${(props) => props.theme.colors.foreground};

  & [cmdk-group-heading] {
    padding: 0.5rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.mutedForeground};
  }
`;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <StyledCommandGroup ref={ref} className={className} {...props} />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

// Стилизованный разделитель
const StyledCommandSeparator = styled(CommandPrimitive.Separator)`
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  height: 1px;
  background-color: ${(props) => props.theme.colors.border};
`;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <StyledCommandSeparator ref={ref} className={className} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// Стилизованный элемент
const StyledCommandItem = styled(CommandPrimitive.Item)`
  position: relative;
  display: flex;
  cursor: default;
  gap: 0.5rem;
  user-select: none;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.5rem;
  margin: 0.125rem 0;
  font-size: ${(props) => props.theme.fontSize.sm};
  outline: none;

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-selected='true'] {
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accentForeground};
  }

  & svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <StyledCommandItem ref={ref} className={className} {...props} />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

// Стилизованный шорткат
const StyledCommandShortcut = styled.span`
  margin-left: auto;
  font-size: ${(props) => props.theme.fontSize.xs};
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <StyledCommandShortcut className={className} {...props} />;
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
