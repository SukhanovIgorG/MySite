import React from 'react';
import { Box, Link } from '@mui/material';

import styles from './TechItem.module.scss';

export interface TechItemProps {
  item: any;
}


export const TechItem = ({ item }: TechItemProps) => {
  const { link, title } = item
  return (
    <Box className={styles.item_container}>
      <Link href={link} className={styles.link}>
        <Box className={styles.item}>{title}</Box>
      </Link>
    </Box>)
}
