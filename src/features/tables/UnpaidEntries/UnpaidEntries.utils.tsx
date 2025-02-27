import { ColumnDef } from '@tanstack/react-table';
import { Phone, Rocket } from 'lucide-react';

import { Cell } from '../components/Cells/Cell';

import { DataItem, EFilerType } from '../Table.types';
import { dateFilterFn } from '../components/DateFilter/DateFilter.utils';
import { numberFilterFn } from '../components/NumRangeFilter/NumRangeFilter.utils';
import { searchFilterFn } from '../components/SearchFilter/SearchFilter.utils';
import { selectFilterFn } from '../components/SelectFilter/SelectFilter.utils';

export const getColumns = (): ColumnDef<DataItem>[] => {
  return [
    {
      header: 'Дата и время',
      accessorKey: 'date',
      cell: ({ row }) => (
        <Cell
          title={row.original.date.toLocaleDateString('ru-RU')}
          subTitle={row.original.timeInterval}
        />
      ),
      enableSorting: true,
      filterFn: dateFilterFn,
      meta: { filterable: true, filterType: EFilerType.Date, width: '15%' },
    },
    {
      header: 'Клиент',
      accessorKey: 'client',
      cell: (value) => {
        return (
          <Cell
            title={value.row.original.client.name}
            subTitle={value.row.original.client.phone}
            icon={<Rocket className="h-5 w-5 text-blue-500" />}
          />
        );
      },
      enableSorting: true,
      filterFn: searchFilterFn,
      meta: { filterable: true, filterType: EFilerType.Search, width: '20%' },
    },
    {
      header: 'Сотрудник',
      accessorKey: 'employee',
      cell: ({ row }) => (
        <Cell
          title={row.original.employee.name}
          subTitle={row.original.employee.position}
        />
      ),
      enableSorting: true,
      meta: { filterable: true, filterType: EFilerType.Select, width: '20%' },
      filterFn: selectFilterFn,
    },
    {
      header: 'Услуга',
      accessorKey: 'services',
      cell: ({ row }) => <Cell subTitle={row.original.services.join(', ')} />,
      enableSorting: true,
      meta: { width: '20%' },
    },
    {
      header: 'Сумма',
      accessorKey: 'amount',
      cell: ({ row }) => (
        <Cell title={`${row.original.amount.toLocaleString()} ₽`} />
      ),
      enableSorting: true,
      meta: {
        width: '10%',
        filterable: true,
        filterType: EFilerType.NumberRange,
      },
      filterFn: numberFilterFn,
    },

    {
      id: 'actions',
      cell: () => (
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm transition-colors flex items-center gap-2">
          <Phone className="h-4 w-4" />
        </button>
      ),
      meta: { width: '5%' },
    },
    {
      id: 'actions',
      cell: () => (
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm transition-colors flex items-center gap-2">
          <Phone className="h-4 w-4" />
        </button>
      ),
      meta: { width: '5%' },
    },
  ];
};
