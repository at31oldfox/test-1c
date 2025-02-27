import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Input } from './input';
import { cn } from '../lib/utils';
import { useMask } from '@react-input/mask';
export interface InputSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const mask = '__-__-____';

export const InputDate = ({
  value,
  onChange,
  containerClassName,
  ...props
}: InputSearchProps) => {
  const inputRef = useMask({
    mask: mask,
    replacement: { _: /\d/ },
    showMask: true,
    separate: true,
  });

  const [inputValue, setInputValue] = useState((value as string) || mask);

  useEffect(() => {
    setInputValue((value as string) || '');
  }, [value]);

  const handleClear = () => {
    setInputValue(mask);
    if (onChange) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value || mask);
    onChange?.(e);
  };

  const isShowClearButton = inputValue.replace(/_/g, '').length > 2;

  return (
    <div className={cn('relative', containerClassName)}>
      <Input
        {...props}
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        className="pr-8 border-[#E6E6E6]"
        defaultValue="__-__-____"
      />
      {isShowClearButton && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 "
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};

InputDate.displayName = 'InputDate';
