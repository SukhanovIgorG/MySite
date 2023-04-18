import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import {Typography, Box} from '@mui/material';

import {Header} from '../../components';
import {login} from '../../api/MainApi';
import {apiErrorController} from '../../utils/errorController';
import {validationPassword, validationEmail} from './utils';

import styles from './login.module.scss';

export const Login = ({onLogin, setCurrentUser}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorApi, setErrorApi] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [submitActive, setSubmitActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorEmail || errorPassword) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, [errorApi, errorEmail, errorPassword]);

  useEffect(() => {
    setErrorApi('');
  }, [email, password]);

  function handleLogin(status) {
    onLogin(status);
  }

  function handleInputEmail(e) {
    setEmail(e.target.value);
    setErrorEmail(validationEmail(e.target.value));
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
    setErrorPassword(validationPassword(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitActive) {
      setIsLoading(true);
      login({email, password})
        .then((userCredential) => {
          const user = userCredential.user;
          setCurrentUser(user);
          localStorage.setItem('JWT', user.accessToken);
          localStorage.setItem('userId', user.uid);
          handleLogin(true);
          setEmail('');
          setPassword('');
          navigate('/movies');
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorMessage :>> ', errorCode, errorMessage);
          setErrorApi(apiErrorController(error));
          setIsLoading(false);
        });
    } else {
      setErrorApi('Заполните все поля корректными данными');
    }
  }

  return (
    <Box className={styles.container}>
      <Header loggedIn={false}></Header>
      <Box className={styles.form_box}>
        <Box className={styles.form_value}>
          <Box
            component={'form'}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h3"
              className={styles.title}
            >
              Вход
            </Typography>
            <Box className={styles.inputbox}>
              <ion-icon
                className={styles.ion_icon}
                name="person-circle-outline"
              ></ion-icon>
              <input
                value={email ? email : ''}
                onChange={handleInputEmail}
                className={styles.input}
                type="email"
                disabled={isLoading}
              ></input>
              <Box
                component={'label'}
                className={styles.inputbox_label}
              >
                Почта
              </Box>
            </Box>
            <Box
              component={'span'}
              className={styles.input_error}
            >
              {errorEmail}
            </Box>
            <Box className={styles.inputbox}>
              <ion-icon
                className={styles.ion_icon}
                name="lock-closed-outline"
              ></ion-icon>
              <input
                className={styles.input}
                type="password"
                value={password ? password : ''}
                onChange={handleInputPassword}
                disabled={isLoading}
              ></input>
              <Box
                component={'label'}
                className={styles.inputbox_label}
              >
                Пароль
              </Box>
            </Box>
            <Box
              component={'span'}
              className={styles.input_error}
            >
              {errorPassword}
            </Box>
            <Box className={styles.bottom}>
              <Box className={styles.left}>
                <input
                  type={'checkbox'}
                  id="check"
                ></input>
                <Box
                  component={'label'}
                  htmlFor="check"
                  className={styles.label_a}
                >
                  Запомнить
                </Box>
              </Box>
              <Box className={styles.right}>
                <Box component={'label'}>
                  <Link
                    className={styles.label_a}
                    href="./"
                    to={'/signup'}
                  >
                    Зарегистрироваться
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box
              component={'button'}
              className={styles.button}
            >
              Войти
            </Box>
            <Box
              component={'span'}
              className={styles.input_error}
            >
              {errorApi}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
