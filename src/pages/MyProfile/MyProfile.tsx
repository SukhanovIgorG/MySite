import React, { useMemo } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';

import { Typography, Box } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

import { Header } from '../../components';
import { updateUser } from '../../api/MainApi';
import { apiErrorController } from '../../utils/errorController';

import { UserFB } from '../../types';
import { MyProfileFormInput, MyProfileProps } from './myProfile';
import { schema } from './shema';

import styles from './MyProfile.module.scss';

export const MyProfile = ({ onLogOut, setCurrentUser }: MyProfileProps) => {
  const navigate = useNavigate();

  const [errorApi, setErrorApi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<MyProfileFormInput>({
    resolver: joiResolver(schema),
  });
  const onSubmit: SubmitHandler<MyProfileFormInput> = data => functionSubmit(data);

  function functionSubmit(data: MyProfileFormInput) {
    const { name, email } = data;
    setIsLoading(true);
    updateUser({ name })
      .then((userCredential: any) => {
        const user: UserFB = userCredential.user;
        setCurrentUser(user);
        // localStorage.setItem('JWT', user.accessToken ? user.accessToken : '');
        // localStorage.setItem('userId', user.uid);
        // handleLogin(true);
        // navigate('/movies');
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
      <Box className={styles.form_box_log}>
        <Box className={styles.form_value}>
          <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h3"
              className={styles.title}
            >
              Редактировать профиль
            </Typography>
            <Box className={styles.inputbox}>
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
              </Box>
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
            <Box className={styles.bottom}>
            </Box>
            <Box
              component={'button'}
              className={styles.button}
              disabled={isLoading}
              type="submit"
            >
              Редактировать
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
