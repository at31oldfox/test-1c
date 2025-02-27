import { FilterContextProvider } from '../components/filter-context/filter-context';
import { EntriesOnConfirmationTable } from './EntriesOnConfirmationTable';
import styles from './EntriesOnConfirmation.module.css';

export const EntriesOnConfirmation = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Записи на подтверждении</h4>
      <FilterContextProvider>
        <EntriesOnConfirmationTable />
      </FilterContextProvider>
    </div>
  );
};
