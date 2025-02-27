import { FC } from 'react';

import { SortingDown } from '../Icons/SortingDown';
import { SortingUp } from '../Icons/SortingUp';

import styles from './SortButton.module.css';
import { ISortButtonProps } from './SortButton.types';

const sortIcons = {
  asc: <SortingUp />,
  desc: <SortingDown />,
};

export const SortButton: FC<ISortButtonProps> = ({ onClick, isSorted }) => {
  const icon = isSorted ? sortIcons[isSorted] : <SortingDown />;

  return (
    <button onClick={onClick} className={styles.sortButton}>
      {icon}
    </button>
  );
};
