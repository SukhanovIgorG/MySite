import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import { PortfolioItem } from './PortfolioItem';
import { Items } from './constants';

import styles from './Portfolio.module.scss';

export const Portfolio = () => {
  return (
    <Box className={styles.container}>
      <Box component="ul" className={styles.list}>
        <Typography className={styles.title}>Портфолио</Typography>
        <Divider className={styles.divider} color="#fff" />
        {Items.map((item, index) => (
          <PortfolioItem item={item} key={index}></PortfolioItem>
        ))}
      </Box>
    </Box>
  );
};


