import { FilterContextProvider } from '../components/filter-context/filter-context';
import { RecordsToTransferTable } from './RecordsToTransferTable';
import styles from './RecordsToTransfer.module.css';

export const RecordsToTransfer = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Требует переноса</h4>
      <FilterContextProvider>
        <RecordsToTransferTable />
      </FilterContextProvider>
    </div>
  );
};
