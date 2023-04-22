import React from 'react';
import { Box } from '@mui/material';

import { PortfolioItem } from './PortfolioItem';
import { Items } from './constants';

import styles from './portfolio.module.scss';

export const Portfolio = () => {
  return (
    <Box className={styles.container}>
      <ul className={styles.list}>
        <p className={styles.title}>Портфолио</p>
        {Items.map((item) => (
          <PortfolioItem item={item}></PortfolioItem>
        ))}
      </ul>
    </Box>
  );
};


