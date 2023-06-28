export function apiErrorController(err) {
  console.log('err :>> ', err);
  if (err.code === 'auth/user-not-found') {
    return 'не правильный логин или пароль';
  } else if (err.code === 'auth/email-already-in-use') {
    return 'Пользователь с таким email уже существует';
  } else {
    return 'что-то пошло не так, возможно проблема с интернетом';
  }
}
