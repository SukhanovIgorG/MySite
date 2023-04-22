import React from 'react';
import { Box, Typography } from '@mui/material'

import { TechFrontItems } from './constants';

import styles from './Tech.module.scss'
import { TechItem } from './TechItem';

export const Tech = () => {
  return (
    <Box component={'section'} className={styles.block}>
      <Typography variant='h2' className={styles.block__title}>Стек</Typography>
      <Box className={styles.wrapper}>
        <Box className={styles.title}>Технологии</Box>
        <Box className={styles.container}>
          <Box className={styles.line}><Typography className={styles.line_title}>Фронтэнд:</Typography>{TechFrontItems.map((item) => { return <TechItem item={item} /> })}</Box>

        </Box>
      </Box>
    </Box>
  );
}
