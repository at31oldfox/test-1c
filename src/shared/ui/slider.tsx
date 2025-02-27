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
  height: 0.375rem;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  border-radius: 9999px;
  background-color: rgba(24, 24, 27, 0.2); /* zinc-900/20 */

  @media (prefers-color-scheme: dark) {
    background-color: rgba(250, 250, 250, 0.2); /* zinc-50/20 */
  }
`;

// Стилизованный диапазон слайдера
const StyledRange = styled(SliderPrimitive.Range)`
  position: absolute;
  height: 100%;
  background-color: #18181b; /* zinc-900 */

  @media (prefers-color-scheme: dark) {
    background-color: #fafafa; /* zinc-50 */
  }
`;

// Стилизованный ползунок слайдера
const StyledThumb = styled(SliderPrimitive.Thumb)`
  display: block;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  border: 1px solid #e4e4e7; /* zinc-200 */
  border-color: rgba(24, 24, 27, 0.5); /* zinc-900/50 */
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px #09090b; /* zinc-950 */
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  @media (prefers-color-scheme: dark) {
    border: 1px solid #27272a; /* zinc-800 */
    border-color: rgba(250, 250, 250, 0.5); /* zinc-50/50 */
    background-color: #09090b; /* zinc-950 */

    &:focus-visible {
      box-shadow: 0 0 0 1px #d4d4d8; /* zinc-300 */
    }
  }
`;

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <StyledSlider ref={ref} className={className} {...props}>
    <StyledTrack>
      <StyledRange />
    </StyledTrack>
    <StyledThumb />
  </StyledSlider>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
