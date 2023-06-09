import {audioCheck} from '../../pages/Movies/Search/constants';

import styles from './checkBox.module.scss';

export const CheckBox = ({
  savedMoviesStatus,
  handleShortSave,
  handleShort,
  buttonState,
}) => {
  const handleChange = () => {
    const audio = new Audio(audioCheck);
    savedMoviesStatus ? handleShortSave() : handleShort();
    audio.play();
  };
  return (
    <div className={styles.switch_container}>
      <input
        checked={buttonState}
        className={styles.switch_input}
        type="checkbox"
        onChange={handleChange}
      />
      <div className={styles.switch_button}>
        <div className={styles.switch_button_inside}>
          <svg
            className={styles.switch_icon_off}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
            />
          </svg>
          <svg
            className={styles.switch_icon_on}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="7"
              width="12"
              height="2"
              rx="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
