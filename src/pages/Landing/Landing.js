import {Box} from '@mui/material';
import {Footer, Header} from '../../components';

import About from './About/About';
import {Tech} from './Tech/Tech';
import {Resume} from './Resume/Resume';
import {Portfolio} from './Portfolio';

export const Landing = ({loggedIn, login, menuOpen, menuClose, menuStatus}) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Box
        className="landing"
        component={'main'}
      >
        <Resume />
        <Portfolio />
        <About />
        <Tech />
      </Box>
      <Footer />
    </>
  );
};
