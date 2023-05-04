import React from 'react';
import { Box, Typography, Divider } from '@mui/material'

import { TechFrontItems, TechBackItems, TechOtherItems } from './constants';

import styles from './Tech.module.scss'
import { TechItem } from './TechItem';

export const Tech = () => {
  return (
    <Box component={'section'} className={styles.block}>
      <Typography variant='h2' className={styles.block__title}>Стек</Typography>
      <Box className={styles.wrapper}>
        <Box className={styles.title}>Технологии</Box>
        <Box className={styles.container}>
          <Box className={styles.box_line}>
            <Box className={styles.line}><Box className={styles.item_title} ><Typography className={styles.line_title}>Фронтэнд:</Typography></Box>
              {TechFrontItems.map((item, key) => { return <TechItem item={item} key={key} /> })}
            </Box>
            <Divider color="#fff" />

            <Box className={styles.line}><Box className={styles.item_title} ><Typography className={styles.line_title}>Бэкэнд:</Typography></Box>
              {TechBackItems.map((item, key) => { return <TechItem item={item} key={key} /> })}
            </Box>
            <Divider color="#fff" />

            <Box className={styles.line}><Box className={styles.item_title} ><Typography className={styles.line_title}>Другое:</Typography></Box>
              {TechOtherItems.map((item, key) => { return <TechItem item={item} key={key} /> })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
