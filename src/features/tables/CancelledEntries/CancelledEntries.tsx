import { FilterContextProvider } from '../components/filter-context/filter-context';

import { CancelledEntriesTable } from './CancelledEntriesTable';
import styles from './CancelledEntries.module.css';

export const CancelledEntries = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Отмененные записи</h4>
      <FilterContextProvider>
        <CancelledEntriesTable />
      </FilterContextProvider>
    </div>
  );
};
