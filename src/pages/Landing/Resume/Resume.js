import {Box, Divider, Link, Typography} from '@mui/material';
import styles from './Resume.module.scss';

export const Resume = () => {
  const year = 1991;
  const month = 11;
  const day = 12;
  const today = new Date();
  const age = today.getFullYear() - year;
  let myAge;
  if (
    today.getMonth() < month ||
    (today.getMonth() === month && today.getDate() < day)
  ) {
    myAge = age - 1;
  } else {
    myAge = age;
  }

  return (
    <Box
      component="section"
      className={styles.block}
    >
      <Typography className={styles.block__title}>Резюме</Typography>
      <Divider color="#fff"></Divider>
      <Box className={styles.student__container}>
        <Box className={styles.container}>
          <Box className={styles.text}>
            <Typography className={styles.title}>Привет, я Игорь</Typography>
            <Typography className={styles.subtitle}>
              Фронтенд-разработчик. {myAge} год.
            </Typography>
            <Typography className={styles.paragraph}>
              На этой странице вы можете подробнее узнать обо мне, моих работах
              и найти ссылки для связи со мной
            </Typography>
            <Link
              className={styles.link}
              href="https://github.com/SukhanovIgorG"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          </Box>
          <Box className={styles.photo} />
        </Box>
      </Box>
    </Box>
  );
};
