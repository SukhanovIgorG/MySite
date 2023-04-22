import React from 'react';
import { Box } from '@mui/material';

import styles from './TechItem.module.scss';

export interface TechItemProps {
  item: string;
}

export const TechItem = ({ item = 'tech.js' }: TechItemProps) => {
  return (<Box className={styles.item}>{item}</Box>)
}
