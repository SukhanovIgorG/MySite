import React from 'react';
import { Box } from '@mui/material';
// import { PortfolioItemProps } from './';

import styles from './portfolioitem.module.scss';

export interface PortfolioItemProps {
  item: {
    title: string
    link: string
  }
}


export const PortfolioItem = ({ item }: PortfolioItemProps) => {
  const { title, link } = item
  return (
    <Box component="li" className={styles.item}>
      <Box component="a"
        className={styles.link}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {title}
      </Box>
      <Box component="a"
        className={styles.icon}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        ↗
      </Box>
    </Box>
  );
}
