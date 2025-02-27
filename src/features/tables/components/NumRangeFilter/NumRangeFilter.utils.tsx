import { FilterFn } from '@tanstack/react-table';

export const numberFilterFn: FilterFn<any> = (row, name, value) => {
  if (value === undefined || value.length === 0) {
    return false;
  } else {
    return row.original[name] >= value[0] && row.original.amount <= value[1];
  }
};
