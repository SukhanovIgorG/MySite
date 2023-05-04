import {Box, Divider, Link, Typography} from '@mui/material';
import style from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className={style.footer}
    >
      <Link
        className={style.text_link}
        href="https://t.me/garik_sukhanov"
        target="_blank"
        rel="noreferrer"
      >
        <Typography className={style.title}>Author @garik_sukhanov</Typography>{' '}
      </Link>
      <Divider color="#fff" />
      <Box className={style.container}>
        <Typography className={style.text}>© {currentYear}</Typography>
        <Box className={style.nav_container}>
          <Link
            className={style.text_link}
            href="https://github.com/SukhanovIgorG"
            target="_blank"
            rel="noreferrer"
          >
            <Typography className={style.text}>Github</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
