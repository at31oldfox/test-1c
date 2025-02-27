import { FilterFn } from '@tanstack/react-table';

export const selectFilterFn: FilterFn<any> = (row, _, value) => {
  if (value === undefined || value.length === 0) {
    return false;
  } else {
    //const { someProp, otherProp } = mapOrConvertBackLabel(value);
    return (
      //someProp.includes(row.original.myObj?.someProp) &&
      //otherProp.includes(row.original.myObj?.otherProp)
      row.original.employee.name === value
    );
  }
};
