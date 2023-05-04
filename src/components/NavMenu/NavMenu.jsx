import {useState} from 'react';
import {Box} from '@mui/material';
import {Link} from 'react-router-dom';
import styles from './navMenu.module.scss';

export const NavMenu = ({menuItems}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Box
        component={'button'}
        className={
          isOpen ? styles.burger_button_open : styles.burger_button_closed
        }
        onClick={() => setIsOpen(!isOpen)}
      ></Box>
      <Box
        component={'nav'}
        className={
          isOpen ? styles.menu_container_open : styles.menu_container_closed
        }
      >
        {Array.from(menuItems).map(({title, link}, index) => {
          return (
            <Link
              to={link}
              className={styles.menuItem}
              key={Math.random() * index}
            >
              {title}
            </Link>
          );
        })}
      </Box>
    </>
  );
};
