import headerLogo from '../../image/header-logo.svg';

import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {login} from '../../utils/MainApi';
import {apiErrorController} from '../../utils/errorController';
import {validationPassword, validationEmail} from './utils';

import styles from './login.module.scss';

export const NewLogin = ({onLogin, setCurrentUser}) => {
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
    <div className={styles.container}>
      <img
        className={styles.header_logo}
        src={headerLogo}
        alt="логотип"
        onClick={() => navigate('/')}
      />
      <div className={styles.form_box}>
        <div className={styles.form_value}>
          <form onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <div className={styles.inputbox}>
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
              <label className={styles.inputbox_label}>Почта</label>
            </div>
            <span className={styles.input_error}>{errorEmail}</span>
            <div className={styles.inputbox}>
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
              <label className={styles.inputbox_label}>Пароль</label>
            </div>
            <span className={styles.input_error}>{errorPassword}</span>
            <div className={styles.bottom}>
              <div className={styles.left}>
                <input
                  type={'checkbox'}
                  id="check"
                ></input>
                <label htmlFor="check">Запомнить</label>
              </div>
              <div className={styles.right}>
                <label>
                  <Link
                    className={styles.label_a}
                    href="./"
                    to={'/signup'}
                  >
                    Зарегистрироваться
                  </Link>
                </label>
              </div>
            </div>
            <button className={styles.button}>Войти</button>
            <span className={styles.input_error}>{errorApi}</span>
          </form>
        </div>
      </div>
    </div>
  );
};
