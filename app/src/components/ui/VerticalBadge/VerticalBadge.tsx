import React from 'react';
import styles from './VerticalBadge.module.css';

export type VerticalType = 'gym' | 'salon' | 'restaurant';

export interface VerticalBadgeProps {
  type: VerticalType;
}

export const VerticalBadge: React.FC<VerticalBadgeProps> = ({ type }) => {
  const labels: Record<VerticalType, string> = {
    gym: 'Gym',
    salon: 'Salon',
    restaurant: 'Restaurant',
  };

  return <span className={styles.badge}>{labels[type]}</span>;
};

export default VerticalBadge;
