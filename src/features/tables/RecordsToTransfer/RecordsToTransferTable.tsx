import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { fetchMockData } from '../__mock';
import {
  FilterContext,
  TNamedFilter,
} from '../components/filter-context/filter-context';
import { DataItem } from '../Table.types';
import { useTable } from '../tableHooks';
import styles from '../Table.module.css';

import { getColumns } from './RecordsToTransfer.utils';

export type TApiResponse = {
  data: DataItem[];
  meta: {
    totalRowCount: number;
    page: number;
    filters: TNamedFilter[];
  };
};

export const RecordsToTransferTable = () => {
  const { filters, setDefaultRange } = useContext(FilterContext);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery<TApiResponse>({
      queryKey: [
        'RequireConfirmation',

        filters,
        //sorting, //refetch when sorting changes
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const data = await fetchMockData(pageParam as number, filters);
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.page + 1;
      },
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      gcTime: 1000,
      /*select: (data) => {
        const _data = data?.pages?.flatMap((page) => page.data) || [];
        return { data: _data, meta: { totalRowCount: 1400 } } as TApiResponse;
      },*/
    });

  const flatData: DataItem[] = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 480 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      const handleScroll = () => fetchMoreOnBottomReached(container);
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [fetchMoreOnBottomReached]);

  const defaultRanges = useMemo(() => {
    return data?.pages?.[0]?.meta?.filters ?? [];
  }, [data]);

  useEffect(() => {
    if (defaultRanges.length > 0) {
      setDefaultRange(defaultRanges);
    }
  }, [defaultRanges, setDefaultRange]);

  const conumns = getColumns();
  const { tableBody, tableHead } = useTable(
    flatData,
    tableContainerRef,
    conumns
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div ref={tableContainerRef} className={styles.tableContainer}>
      <table className={styles.table}>
        {tableHead}
        {tableBody}
      </table>
    </div>
  );
};
