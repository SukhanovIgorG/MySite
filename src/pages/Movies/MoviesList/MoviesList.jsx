import MovieCard from './MovieCard/MovieCard';
import style from './MoviesList.module.scss'

function MoviesList({
  movies,
  render,
  savedMoviesStatus,
  children,
  addLike,
  deleteLike,
  onRender,
  saveMovies,
}) {

  return (
    <section className={style.container}>
      <ul className={style.main}>
        {Array.isArray(movies)
          ? movies.map((movie) => (
              <MovieCard
                saveMovies={saveMovies}
                key={movie.id}
                movie={movie}
                savedMoviesStatus={savedMoviesStatus}
                onLike={addLike}
                onDelete={deleteLike}
                render={render}
                onRender={onRender}
              />
            ))
          : null}
      </ul>
      {children}
    </section>
  );
}

export default MoviesList;
