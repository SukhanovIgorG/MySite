import {Box} from '@mui/material';
import {Footer, Header} from '../../components';

import About from './About/About';
import Tech from './Tech/Tech';
import Student from './Student/Student';
import Hero from './Hero/Hero';

export const Landing = ({loggedIn, login, menuOpen, menuClose, menuStatus}) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Box
        className="landing"
        component={'main'}
      >
        <Hero />
        <About />
        <Tech />
        <Student />
      </Box>
      <Footer />
    </>
  );
};
