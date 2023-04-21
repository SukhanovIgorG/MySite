import {Box} from '@mui/material';
import React from 'react';

import styles from './portfolio.module.scss';

export const Portfolio = () => {
  return (
    <Box className={styles.container}>
      <ul className={styles.portfolio_list}>
        <p className={styles.portfolio_title}>Портфолио</p>
        <li className={styles.portfolio_item}>
          <a
            className={styles.portfolio_link}
            href="https://sukhanovigorg.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <a
            className={styles.portfolio_icon}
            href="https://sukhanovigorg.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
        <li className={styles.portfolio_item}>
          <a
            className={styles.portfolio_link}
            href="https://sukhanovigorg.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <a
            className={styles.portfolio_icon}
            href="https://sukhanovigorg.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
        <li className={styles.portfolio_item}>
          <a
            className={styles.portfolio_link}
            href="https://sukhanovigorg.github.io/mesto-react/"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <a
            className={styles.portfolio_icon}
            href="https://sukhanovigorg.github.io/mesto-react/"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
      </ul>
    </Box>
  );
};
