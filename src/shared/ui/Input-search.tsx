import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Search, X } from 'lucide-react';

import { Input } from './input';

export interface InputSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Стилизованный контейнер
const Container = styled.div`
  position: relative;
  width: 100%;
`;

// Стилизованная иконка поиска
const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

// Стилизованная кнопка очистки
const ClearButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

// Стилизованная иконка X
const ClearIcon = styled(X)`
  height: 1rem;
  width: 1rem;
  color: ${(props) => props.theme.colors.mutedForeground};
`;

// Стилизованный инпут
const SearchInput = styled(Input)`
  padding-left: 2.5rem;
  padding-right: 2rem;
  border-color: #e6e6e6;
`;

export const InputSearch = ({
  value,
  onChange,
  ...props
}: InputSearchProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  return (
    <Container>
      <SearchIcon />
      <SearchInput {...props} value={inputValue} onChange={handleChange} />
      {inputValue && (
        <ClearButton type="button" onClick={handleClear}>
          <ClearIcon />
        </ClearButton>
      )}
    </Container>
  );
};

InputSearch.displayName = 'InputSearch';
