import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../lib/utils';

const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-[#E6E6E6] ">
      <SliderPrimitive.Range className="absolute h-full bg-[#4DC2FF]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-[#4DC2FF] shadow transition-colors  disabled:pointer-events-none disabled:opacity-50 " />
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-[#4DC2FF] shadow transition-colors  disabled:pointer-events-none disabled:opacity-50 " />
  </SliderPrimitive.Root>
));

SliderRange.displayName = SliderPrimitive.Root.displayName;

export { SliderRange };
