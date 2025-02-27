import { FC, ReactNode } from 'react';

import { cn } from '../../../../shared/lib/utils';
import styles from './ThHeader.module.css';

interface IThHeaderProps {
  id: string;
  children?: ReactNode;
  width?: string;
  className?: string;
}

export const ThHeader: FC<IThHeaderProps> = ({
  children,
  id,
  width,
  className,
}) => {
  return (
    <th
      key={id}
      className={cn(styles.headerCell, className)}
      style={{
        width: width || 'auto',
      }}
    >
      <div className={styles.headerContent}>{children}</div>
    </th>
  );
};
