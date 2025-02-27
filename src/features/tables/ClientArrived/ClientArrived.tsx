import { FilterContextProvider } from '../components/filter-context/filter-context';
import { ClientArrivedTable } from './ClientArrivedTable';
import styles from './ClientArrived.module.css';

export const ClientArrived = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Клиент пришёл</h4>
      <FilterContextProvider>
        <ClientArrivedTable />
      </FilterContextProvider>
    </div>
  );
};
