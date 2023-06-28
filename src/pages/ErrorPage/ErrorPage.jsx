import { Link } from 'react-router-dom';
import style from "./ErrorPage.module.scss"

export const ErrorPage = () => {
  return (
    <div className={style.main}>
      <div className={style.container}>
        <h2 className={style.code}>404</h2>
        <p className={style.message}>Страница не найдена</p>
        <Link
          href="#"
          className={style.back}
          to={-1}
        >
          Назад
        </Link>
      </div>
    </div>
  );
};
