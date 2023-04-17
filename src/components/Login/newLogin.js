import headerLogo from '../../image/header-logo.svg';

import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../utils/MainApi';
import {apiErrorController} from '../../utils/errorController';
import {validationPassword, validationEmail} from './utils';

import styles from './login.module.css';

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
      <div className={styles.form_box}>
        <div className={styles.form_value}>
          <form>
            <h2>Вход</h2>
            <div className={styles.inputbox}>
              <ion-icon
                className={styles.ion_icon}
                name="person-circle-outline"
              ></ion-icon>
              <input
                className={styles.input}
                type="email"
              ></input>
              <label className={styles.inputbox_label}>Почта</label>
            </div>
            <div className={styles.inputbox}>
              <ion-icon
                className={styles.ion_icon}
                name="lock-closed-outline"
              ></ion-icon>
              <input
                className={styles.input}
                type="password"
              ></input>
              <label className={styles.inputbox_label}>Пароль</label>
            </div>
            <div className={styles.bottom}>
              <div className={styles.left}>
                <input
                  type={'checkbox'}
                  id="check"
                ></input>
                <label htmlFor="check">Запомнить меня</label>
              </div>
              <div className={styles.right}>
                <label>
                  <a
                    className={styles.label_a}
                    href="./"
                  >
                    Зарегистрироваться
                  </a>
                </label>
              </div>
            </div>
            <button className={styles.button}>Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};
