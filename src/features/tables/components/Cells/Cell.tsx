import type { FC, ReactNode } from 'react';

import styles from './cell.module.css';

export interface ICellProps {
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
}

export const Cell: FC<ICellProps> = ({ title, subTitle, icon }) => {
  return (
    <div className={styles.container}>
      {icon ? <div className={styles.iconWrapper}>{icon}</div> : null}
      <div className={styles.content}>
        {title ? <span className={styles.title}>{title}</span> : null}
        {subTitle ? <span className={styles.subtitle}>{subTitle}</span> : null}
      </div>
    </div>
  );
};
