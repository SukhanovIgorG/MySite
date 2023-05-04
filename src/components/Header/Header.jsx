import {menuItemsLogin, menuItemsUnLogin} from './constants';

import {Logo} from '../Logo/Logo';
import {NavMenu} from '../NavMenu/NavMenu';

import styles from './header.module.scss';

export const Header = ({loggedIn}) => {
  console.log('loggedIn :>> ', loggedIn);
  return (
    <header className={styles.container}>
      <Logo />
      <NavMenu
        menuItems={loggedIn ? menuItemsLogin : menuItemsUnLogin}
      ></NavMenu>
    </header>
  );
};
