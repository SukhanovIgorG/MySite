import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Search from './Search/Search';
import MoviesList from './MoviesList/MoviesList';
import {Footer} from '../../components';
import {Header} from '../../components';
import Preloader from '../../components/Preloader/Preloader';

import { likeMovies, disLakeMovies } from '../../api/MainApi';

import styles from './Movies.module.scss'

export const Movies = ({
  isLoading,
  savedMoviesStatus,
  onMovies,
  onMoviesSave,
  onKeyWord,
  onSaveKeyWord,
  onSearchKeyWord,
  onInputKeyWord,
  onInputSaveKeyWord,
  conditionShort,
  onChangeShort,
  conditionShortSave,
  onChangeShortSave,
  onMoreMovies,
  buttonStatus,
  onRender,
  onReset,
  onCatch,
  onSetCatch,
}) => {
  // REDUX
  const dispatch = useDispatch();
  const saveMoviesRedux = useSelector((state) => state.movies);

  let movies = savedMoviesStatus
    ? Array.from(saveMoviesRedux)
    : Array.from(onMovies);

  useEffect(() => {
    onReset();
    onSetCatch();
  }, [savedMoviesStatus]);

  async function Like(arg) {
    await likeMovies(arg)
      .then(() => {
        dispatch({type: 'add_like', payload: arg});
        onRender(1);
      })
      .catch(() => {
        onSetCatch('Проблемы с тырнетом');
      });
  }

  async function disLike(arg) {
    await disLakeMovies(arg)
      .then(() => {
        dispatch({type: 'del_like', payload: arg});
        onRender(1);
      })
      .catch(() => {
        onSetCatch('Проблемы с тырнетом');
      });
  }

  return (
    <div className={styles.Movies} >
      <Header loggedIn={true} />
      <main className={styles.Movies_main}>
        <Search
          savedMoviesStatus={savedMoviesStatus}
          keyWordState={onKeyWord}
          saveKeyWordState={onSaveKeyWord}
          onInput={onInputKeyWord}
          onSaveInput={onInputSaveKeyWord}
          onSearch={onSearchKeyWord}
          shortState={conditionShort}
          onSetShort={onChangeShort}
          shortStateSave={conditionShortSave}
          onSetShortSave={onChangeShortSave}
        />
        {isLoading && (
          <Preloader
            onLoading={true}
            message={'поиск...'}
          />
        )}
        {onCatch && (
          <Preloader
            onLoading={false}
            message={onCatch}
          />
        )}

        {movies.length !== 0 &&
          <MoviesList
            savedMoviesStatus={savedMoviesStatus}
            movies={savedMoviesStatus ? onMoviesSave : onMovies}
            saveMovies={onMoviesSave}
            addLike={Like}
            deleteLike={disLike}
            render={onMovies}
            onRender={onRender}
          >
            <button
              className={
                buttonStatus ? styles.button_off : styles.button
              }
              onClick={onMoreMovies}
            >
              Еще
            </button>
          </MoviesList>
        }
      </main>
      <Footer />
    </div>
  );
};
