import {useMemo} from 'react';
import style from './MovieCard.module.scss'

function MovieCard({movie, savedMoviesStatus, onLike, onDelete, saveMovies}) {
  let setMovie = movie ? movie : {};

  const isLiked = useMemo(() => {
    if (saveMovies.length > 0) {
      return saveMovies.find(
        (item) => item.nameRU.toLowerCase() === movie.nameRU.toLowerCase()
      );
    } else {
      return false;
    }
  }, [movie.nameRU, saveMovies]);

  const handleLikeOrDell = () => {
    isLiked || savedMoviesStatus ? onDelete(movie) : onLike(movie);
  };

  return (
    <li className={style.main}>
      <a
        href={setMovie.trailerLink}
        target="_blanc"
      >
        <img
          className={style.image}
          src={`https://api.nomoreparties.co/${setMovie.image.url}`}
          alt={movie.nameRU}
        />
      </a>

      <div className={style.info}>
        <div className={style.info_container}>
          <h2 className={style.title}>{setMovie.nameRU}</h2>
          <p className={style.duration}>{`${Math.floor(
            setMovie.duration / 60
          )}ч ${setMovie.duration % 60}м `}</p>
        </div>
        {savedMoviesStatus && (
          <button
            type="button"
      className={style.trash}
            onClick={handleLikeOrDell}
          />
        )}
        {!savedMoviesStatus && (
          <button
            type="button"
            className={!isLiked ? style.like_not_active : style.like_active}
            onClick={handleLikeOrDell}
          />
        )}
      </div>
    </li>
  );
}

export default MovieCard;
