import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { X } from 'lucide-react';

import { Input } from './input';

export interface InputSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

// Стилизованный контейнер
const Container = styled.div`
  position: relative;
`;

// Стилизованная кнопка очистки
const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

// Стилизованная иконка
const ClearIcon = styled(X)`
  height: 1rem;
  width: 1rem;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

// Стилизованный инпут
const CleanableInput = styled(Input)`
  padding-right: 2rem;
  border-color: #e6e6e6;
`;

export const InputCleanable = ({
  value,
  onChange,
  containerClassName,
  ...props
}: InputSearchProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(value);
    }
  }, [value]);

  const handleClear = useCallback(() => {
    setInputValue('');
    onChange?.({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <Container className={containerClassName}>
      <CleanableInput {...props} value={inputValue} onChange={handleChange} />
      {inputValue && (
        <ClearButton type="button" onClick={handleClear}>
          <ClearIcon />
        </ClearButton>
      )}
    </Container>
  );
};

InputCleanable.displayName = 'InputCleanable';
