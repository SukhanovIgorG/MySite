import {Box} from '@mui/material';
import {Footer, Header} from '../../components';

import {Tech} from './Tech/Tech';
import {Resume} from './Resume/Resume';
import {Portfolio} from './Portfolio';

import style from './Landing.module.scss';

export const Landing = ({loggedIn, login, menuOpen, menuClose, menuStatus}) => {
  return (
    <Box className={style.container}>
      <Header loggedIn={loggedIn} />
      <Box
        className="landing"
        component={'main'}
      >
        <Resume />
        <Portfolio />
        <Tech />
      </Box>
      <Footer />
    </Box>
  );
};
