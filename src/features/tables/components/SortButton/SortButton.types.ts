import { SortDirection } from '@tanstack/react-table';

export interface ISortButtonProps {
  isSorted: false | SortDirection;
  onClick?: (event: unknown) => void;
}
