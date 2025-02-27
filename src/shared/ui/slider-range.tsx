import * as React from 'react';

import styled from '@emotion/styled';
import * as SliderPrimitive from '@radix-ui/react-slider';

// Стилизованный корневой элемент слайдера
const StyledSlider = styled(SliderPrimitive.Root)`
  position: relative;
  display: flex;
  width: 100%;
  touch-action: none;
  user-select: none;
  align-items: center;
`;

// Стилизованный трек слайдера
const StyledTrack = styled(SliderPrimitive.Track)`
  position: relative;
  height: 0.125rem;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  border-radius: 9999px;
  background-color: #e6e6e6;
`;

// Стилизованный диапазон слайдера
const StyledRange = styled(SliderPrimitive.Range)`
  position: absolute;
  height: 100%;
  background-color: #4dc2ff;
`;

// Стилизованный ползунок слайдера
const StyledThumb = styled(SliderPrimitive.Thumb)`
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  background-color: #4dc2ff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <StyledSlider ref={ref} className={className} {...props}>
    <StyledTrack>
      <StyledRange />
    </StyledTrack>
    <StyledThumb />
    <StyledThumb />
  </StyledSlider>
));

SliderRange.displayName = SliderPrimitive.Root.displayName;

export { SliderRange };
