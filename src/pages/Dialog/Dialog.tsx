import React, { useMemo } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';

import { Typography, Box } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

import { Header } from '../../components';
import { fireBaseAuthApi } from '../../api/MainApi';
import { apiErrorController } from '../../utils/errorController';

import { UserFB } from '../../types';
import { LoginFormInput, DialogProps } from './dialog.d.';
import { schema } from './shema';

import styles from './dialog.module.scss';

export const Dialog = ({ type, onLogin, setCurrentUser }: DialogProps) => {
  const navigate = useNavigate();

  const registerType = useMemo(() => {
    return type === 'signup' ? true : false;
  }, [type])

  const [errorApi, setErrorApi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    resolver: joiResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginFormInput> = data => functionSubmit(data);

  function handleLogin(status: boolean): void {
    onLogin(status);
  }

  function functionSubmit(data: LoginFormInput) {
    const { name, email, password } = data;
    setIsLoading(true);
    fireBaseAuthApi({ type, name, email, password })
      .then((userCredential: any) => {
        const user: UserFB = userCredential.user;
        setCurrentUser(user);
        localStorage.setItem('JWT', user.accessToken ? user.accessToken : '');
        localStorage.setItem('userId', user.uid);
        handleLogin(true);
        navigate('/movies');
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorApi(apiErrorController(error));
        setIsLoading(false);
      });
  }

  return (
    <Box className={styles.container}>
      <Header loggedIn={false}></Header>
      <Box className={registerType ? styles.form_box_reg : styles.form_box_log}>
        <Box className={styles.form_value}>
          <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h3"
              className={styles.title}
            >
              {registerType ? "Регистрация" : "Вход"}
            </Typography>
            {registerType && <><Box className={styles.inputbox}>
              <AccountCircle className={styles.ion_icon}></AccountCircle>
              <Box component="input"
                {...register("name")}
                className={styles.input}
                type="name"
                disabled={isLoading}
              ></Box>
              <Box
                component={'label'}
                className={styles.inputbox_label}
              >
                Имя
              </Box>
            </Box>
              <Box
                component={'span'}
                className={styles.input_error}
              >
                {errors.name?.message}
              </Box></>}
            <Box className={styles.inputbox}>
              <AccountCircle className={styles.ion_icon}></AccountCircle>
              <Box component="input"
                {...register("email")}
                className={styles.input}
                type="email"
                disabled={isLoading}
              ></Box>
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
              {errors.email?.message}
            </Box>
            <Box className={styles.inputbox}>
              <Lock className={styles.ion_icon}></Lock>
              <Box component="input"
                className={styles.input}
                type="password"
                {...register("password")}
                disabled={isLoading}
              ></Box>
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
              {errors.password?.message}
            </Box>
            <Box className={styles.bottom}>
              <Box className={styles.left}>
                {!registerType &&
                  <><Box component="input"
                    type={'checkbox'}
                    id="check"
                  ></Box>
                    <Box
                      component={'label'}
                      htmlFor="check"
                      className={styles.label_a}
                    >
                      Запомнить
                    </Box></>}
              </Box>
              <Box className={styles.right}>
                <Box component={'label'}>
                  <Link
                    className={styles.label_a}
                    to={registerType ? '/signin' : '/signup'}
                  >
                    {registerType ? 'Войти' : 'Зарегистрироваться'}
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box
              component={'button'}
              className={styles.button}
              disabled={isLoading}
            >
              {registerType ? 'Зарегистрироваться' : 'Войти'}
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
