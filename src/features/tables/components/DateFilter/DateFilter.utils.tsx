import { FilterFn } from '@tanstack/react-table';

export const dateFilterFn: FilterFn<any> = (row, _, value) => {
  if (value === undefined || value.length === 0) {
    return false;
  } else {
    return (row.original.client.name as string).includes(value);
  }
};
