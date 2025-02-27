'use client';

import * as React from 'react';

import styled from '@emotion/styled';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const Accordion = AccordionPrimitive.Root;

// Стилизованный Item
const StyledAccordionItem = styled(AccordionPrimitive.Item)``;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <StyledAccordionItem ref={ref} className={className} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

// Стилизованный Header
const AccordionHeader = styled(AccordionPrimitive.Header)`
  display: flex;
`;

// Стилизованный Trigger
const StyledAccordionTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem; /* p-3 */
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  transition: all 0.2s;
  outline: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }

  &[data-state='open'] > svg {
    transform: rotate(180deg);
  }
`;

// Стилизованная иконка
const StyledChevron = styled(ChevronDown)`
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  color: black;
  transition: transform 0.2s;
`;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionHeader>
    <StyledAccordionTrigger ref={ref} className={className} {...props}>
      {children}
      <StyledChevron />
    </StyledAccordionTrigger>
  </AccordionHeader>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// Стилизованный Content
const StyledAccordionContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: ${(props) => props.theme.fontSize.sm};
  transition: all 0.2s;

  &[data-state='open'] {
    animation: accordionDown 0.2s ease-out;
  }

  &[data-state='closed'] {
    animation: accordionUp 0.2s ease-out;
  }

  @keyframes accordionDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes accordionUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

// Стилизованный контейнер содержимого
const ContentContainer = styled.div`
  padding: 0 0 1rem 0; /* pb-4 pt-0 */
`;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <StyledAccordionContent ref={ref} {...props}>
    <ContentContainer className={className}>{children}</ContentContainer>
  </StyledAccordionContent>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
