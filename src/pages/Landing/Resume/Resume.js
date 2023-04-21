import styles from './resume.module.scss';

export const Resume = () => {
  const year = 1991;
  const month = 11;
  const day = 12;
  const today = new Date();
  const age = today.getFullYear() - year;
  let myAge;
  if (
    today.getMonth() < month ||
    (today.getMonth() === month && today.getDate() < day)
  ) {
    myAge = age - 1;
  } else {
    myAge = age;
  }

  return (
    <section className="block student">
      <h2 className="block__title">Резюме</h2>
      <div className="student__container">
        <div className={styles.container}>
          <div className={styles.text}>
            <h3 className={styles.title}>Привет, я Игорь</h3>
            <h4 className={styles.subtitle}>
              Фронтенд-разработчик. {myAge} год.
            </h4>
            <p className={styles.paragraph}>
              На этой странице вы можете подробнее узнать обо мне, моих работах
              и найти ссылки для связи со мной
            </p>
            <a
              className={styles.link}
              href="https://github.com/SukhanovIgorG"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className={styles.photo} />
        </div>
      </div>
    </section>
  );
};
