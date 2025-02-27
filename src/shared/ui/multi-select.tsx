import * as React from 'react';

import styled from '@emotion/styled';
import {
  CheckIcon,
  ChevronDown,
  WandSparkles,
  X,
  XCircle,
  XIcon,
} from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Separator } from '@/shared/ui/separator';

// Стилизованные варианты для бейджей
const getVariantStyles = (variant: string = 'default') => {
  switch (variant) {
    case 'default':
      return `
        border-foreground/10 
        text-foreground 
        background-color: ${(props: any) => props.theme.colors.card};
        &:hover {
          background-color: ${(props: any) => props.theme.colors.card + '80'};
        }
      `;
    case 'secondary':
      return `
        border-foreground/10 
        background-color: ${(props: any) => props.theme.colors.secondary};
        color: ${(props: any) => props.theme.colors.secondaryForeground};
        &:hover {
          background-color: ${(props: any) => props.theme.colors.secondary + '80'};
        }
      `;
    case 'destructive':
      return `
        border-color: transparent;
        background-color: ${(props: any) => props.theme.colors.destructive};
        color: ${(props: any) => props.theme.colors.destructiveForeground};
        &:hover {
          background-color: ${(props: any) => props.theme.colors.destructive + '80'};
        }
      `;
    case 'outline':
      return `
        border-foreground/10 
        text-foreground 
        background-color: transparent;
        &:hover {
          background-color: ${(props: any) => props.theme.colors.card + '10'};
        }
      `;
    default:
      return `
        border-foreground/10 
        text-foreground 
        background-color: ${(props: any) => props.theme.colors.card};
        &:hover {
          background-color: ${(props: any) => props.theme.colors.card + '80'};
        }
      `;
  }
};

// Стилизованный бейдж для мультиселекта
const StyledBadge = styled(Badge)<{ variant?: string }>`
  margin: 0.25rem;
  ${(props) => getVariantStyles(props.variant)}
`;

// Стилизованный бейдж для дополнительных значений
const CountBadge = styled(Badge)<{ variant?: string }>`
  margin: 0.25rem;
  background-color: transparent;
  color: ${(props) => props.theme.colors.foreground};
  border-color: ${(props) => props.theme.colors.foreground + '1'};

  &:hover {
    background-color: transparent;
  }

  ${(props) => getVariantStyles(props.variant)}
`;

// Стилизованная кнопка
const SelectButton = styled(Button)`
  display: flex;
  width: 100%;
  padding: 0.25rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  max-width: 24rem;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  background-color: inherit;

  &:hover {
    background-color: inherit;
  }

  & svg {
    pointer-events: auto;
  }
`;

// Контейнер для бейджей
const BadgesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

// Контейнер для скролла бейджей
const BadgesScrollContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding-top: 0.75rem;
`;

// Иконки и разделители
const ClearIcon = styled(XIcon)`
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

const StyledChevronDown = styled(ChevronDown)`
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

const RemoveIcon = styled(X)`
  margin-left: 0.5rem;
  height: 1rem;
  width: 1rem;
  color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
`;

const RemoveAllIcon = styled(XCircle)`
  margin-left: 0.5rem;
  height: 1rem;
  width: 1rem;
  cursor: pointer;
`;

const SideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Стили для плейсхолдера
const PlaceholderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const PlaceholderText = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.mutedForeground};
  margin-left: 0.75rem;
  margin-right: 0.75rem;
`;

// Стили для PopoverContent
const StyledPopoverContent = styled(PopoverContent)`
  width: auto;
  padding: 0;
`;

// Стилизованная анимация для палочки
const MagicWand = styled(WandSparkles)<{ isAnimating: boolean }>`
  cursor: pointer;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${(props) =>
    props.isAnimating
      ? props.theme.colors.foreground
      : props.theme.colors.mutedForeground};
  background-color: ${(props) => props.theme.colors.background};
  width: 0.75rem;
  height: 0.75rem;
`;

// Стилизованные компоненты для Command
const StyledActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Стилизованный чекбокс
const CheckboxContainer = styled.div<{ isSelected: boolean }>`
  margin-right: 0.5rem;
  display: flex;
  height: 1rem;
  width: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.125rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  ${(props) =>
    props.isSelected
      ? `
      background-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primaryForeground};
    `
      : `
      opacity: 0.5;
      & svg {
        visibility: hidden;
      }
    `}

  &:hover {
    border-color: ${(props) => props.theme.colors.accentForeground};
  }

  /* Добавляем класс для использования в селекторе */
  &.checkbox-container {
    /* Нет дополнительных стилей, просто класс для селектора */
  }
`;

// const OptionIcon = styled.div`
//   margin-right: 0.5rem;
//   height: 1rem;
//   width: 1rem;
//   color: ${(props) => props.theme.colors.mutedForeground};
// `;

const StyledCommandItem = styled(CommandItem)`
  cursor: pointer;

  &:hover > .checkbox-container {
    border-color: ${(props) => props.theme.colors.accentForeground};
  }
`;

const ActionCommandItem = styled(CommandItem)`
  flex: 1;
  justify-content: center;
  cursor: pointer;
  max-width: 100%;
`;

const StyledVerticalSeparator = styled(Separator)`
  display: flex;
  min-height: 1.5rem;
  height: 100%;
`;

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вариант стиля для мультиселекта
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';

  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant = 'default',
      defaultValue = [],
      placeholder = 'Select options',
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <SelectButton
            ref={ref}
            {...props}
            size="lg"
            onClick={handleTogglePopover}
            className={className}
          >
            {selectedValues.length > 0 ? (
              <BadgesContainer>
                <BadgesScrollContainer>
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <StyledBadge key={value} variant={variant}>
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2" />
                        )}
                        {option?.label}
                        <RemoveIcon
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </StyledBadge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <CountBadge variant={variant}>
                      {`+ ${selectedValues.length - maxCount} еще`}
                      <RemoveAllIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </CountBadge>
                  )}
                </BadgesScrollContainer>
                <SideContainer>
                  <ClearIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <StyledVerticalSeparator orientation="vertical" />
                  <StyledChevronDown />
                </SideContainer>
              </BadgesContainer>
            ) : (
              <PlaceholderContainer>
                <PlaceholderText>{placeholder}</PlaceholderText>
                <StyledChevronDown />
              </PlaceholderContainer>
            )}
          </SelectButton>
        </PopoverTrigger>
        <StyledPopoverContent
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Поиск..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              <CommandGroup>
                <StyledCommandItem key="all" onSelect={toggleAll}>
                  <CheckboxContainer
                    isSelected={selectedValues.length === options.length}
                    className="checkbox-container"
                  >
                    <CheckIcon className="h-4 w-4" />
                  </CheckboxContainer>
                  <span>Выбрать все</span>
                </StyledCommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <StyledCommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                    >
                      <CheckboxContainer
                        isSelected={isSelected}
                        className="checkbox-container"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </CheckboxContainer>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </StyledCommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <StyledActionContainer>
                  {selectedValues.length > 0 && (
                    <>
                      <ActionCommandItem onSelect={handleClear}>
                        Очистить
                      </ActionCommandItem>
                      <StyledVerticalSeparator orientation="vertical" />
                    </>
                  )}
                  <ActionCommandItem onSelect={() => setIsPopoverOpen(false)}>
                    Закрыть
                  </ActionCommandItem>
                </StyledActionContainer>
              </CommandGroup>
            </CommandList>
          </Command>
        </StyledPopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <MagicWand
            isAnimating={isAnimating}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
