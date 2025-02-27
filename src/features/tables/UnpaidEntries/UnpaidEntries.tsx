import { FilterContextProvider } from '../components/filter-context/filter-context';
import { UnpaidEntriesTable } from './UnpaidEntriesTable';
import styles from './UnpaidEntries.module.css';

export const UnpaidEntries = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>UnpaidEntriesTable</h4>
      <FilterContextProvider>
        <UnpaidEntriesTable />
      </FilterContextProvider>
    </div>
  );
};
