import { FilterContextProvider } from '../components/filter-context/filter-context';
import { DirectionsTable } from './DirectionsTable';
import styles from './Directions.module.css';

export const Directions = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Направления</h4>
      <FilterContextProvider>
        <DirectionsTable />
      </FilterContextProvider>
    </div>
  );
};
