import { Button } from '@mui/material';
import React, { useContext, useId, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';

import { Typography, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import { Header } from '../../components';
import { updateUser } from '../../api/MainApi';
import { apiErrorController } from '../../utils/errorController';
import {CurrentUserContext} from '../../context/CurrentUserContext';

// import { UserFB } from '../../types';
import { MyProfileFormInput, MyProfileProps } from './myProfile.d';
import { schema } from './shema';

import style from './MyProfile.module.scss';

export const MyProfile = ({ onLogOut, setCurrentUser }: MyProfileProps) => {
  const formId = useId()

  // const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [errorApi, setErrorApi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue,formState: { errors }, } = useForm<MyProfileFormInput>({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email
    },
    mode: "onChange",
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    setValue("name", currentUser?.name ?? "Имя");
    setValue("email", currentUser?.email ?? "mail");
  }, [currentUser?.name, currentUser?.email, setValue]);

  const onSubmit: SubmitHandler<MyProfileFormInput> = data => {
    functionSubmit(data)
  };

  function functionSubmit(data: MyProfileFormInput) {
    const { name, email } = data;
    setIsLoading(true);
    updateUser(name, email)
      .then((userCredential: any) => {
        // const user: UserFB = userCredential.user;
        // console.log('userCredential :>> ', userCredential);
        // setCurrentUser(user);
        setIsLoading(false);
        setErrorApi('Данные успешно изменены')
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorApi(apiErrorController(error));
        setIsLoading(false);
      });
    }

  return (
    <Box className={style.container}>
      <Header loggedIn={true}></Header>
      <Box className={style.form_box_log}>
        <Box className={style.form_value}>
          <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            id={formId}
          >
            <Typography
              variant="h3"
              className={style.title}
            >
              Редактировать профиль
            </Typography>
            <Box className={style.inputbox}>
              <AccountCircle className={style.ion_icon}></AccountCircle>
              <Box component="input"
                {...register("name")}
                className={style.input}
                disabled={isLoading}
              ></Box>
              <Box
                component={'label'}
                className={style.inputbox_label}
              >
                Имя
              </Box>
            </Box>
            <Box
              component={'span'}
              className={style.input_error}
            >
              {errors.name?.message}
            </Box>
            <Box className={style.inputbox}>
              <AccountCircle className={style.ion_icon}></AccountCircle>
              <Box component="input"
                {...register("email")}
                className={style.input}
                disabled={isLoading}
              ></Box>
              <Box
                component={'label'}
                className={style.inputbox_label}
              >
                Почта
              </Box>
            </Box>
            <Box
              component={'span'}
              className={style.input_error}
            >
              {errors.email?.message}
            </Box>
            <Box className={style.bottom}>
            </Box>
            <Box
              component={'button'}
              className={style.button}
              disabled={isLoading}
              type="submit"
              form={formId}
            >
              Редактировать
            </Box>
            <Box
              component={'span'}
              className={style.input_error}
            >
              {errorApi}
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        className={style.button_logout}
        disabled={isLoading}
        onClick={onLogOut}
      >
        выйти из аккаунта
      </Button>
    </Box>
  );
};
