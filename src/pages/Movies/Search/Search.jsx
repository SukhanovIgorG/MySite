import {useState, useEffect} from 'react';
import { CheckBox } from '../../../components';

import style from './Search.module.scss'

function Search({
  savedMoviesStatus,
  keyWordState,
  saveKeyWordState,
  onInput,
  onSaveInput,
  onSearch,
  shortState,
  onSetShort,
  shortStateSave,
  onSetShortSave,
}) {
  let buttonState = savedMoviesStatus ? shortStateSave : shortState;
  const [keyWord, setKeyWord] = useState(keyWordState);
  const [saveKeyWord, setSaveKeyWord] = useState(saveKeyWordState);
  const [validMess, setValidMess] = useState('');

  useEffect(() => {
    if (savedMoviesStatus) {
      setSaveKeyWord('');
    } else {
      setKeyWord(
        localStorage.getItem('keyWord') !== null
          ? localStorage.getItem('keyWord')
          : ''
      );
      onInput(
        localStorage.getItem('keyWord') !== null
          ? localStorage.getItem('keyWord')
          : ''
      );
      onSetShort(
        localStorage.getItem('conditionShort') !== null
          ? JSON.parse(localStorage.getItem('conditionShort'))
          : false
      );
    }
    setValidMess('');
  }, [savedMoviesStatus]);

  const checkValid = (text) => {
    if (text.length === 0) {
      setValidMess('введите ключевое слово');
    } else if (text.length > 20) {
      setValidMess('вы ввели слишком длинное название');
    } else {
      setValidMess('');
    }
  };

  const handleShort = () => {
    onSetShort(!shortState);
    localStorage.setItem('conditionShort', !shortState);
  };
  const handleShortSave = () => {
    onSetShortSave(!shortStateSave);
  };

  const handleInput = (v) => {
    setKeyWord(v.target.value);
    onInput(v.target.value);
    checkValid(v.target.value);
  };

  const handleSaveInput = (v) => {
    setSaveKeyWord(v.target.value);
    onSaveInput(v.target.value);
    checkValid(v.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
    checkValid(savedMoviesStatus ? saveKeyWord : keyWord);
  };

  return (
    <section className={style.main}>
      <form
        className={style.area}
        noValidate
        onSubmit={handleSearch}
      >
        <input
          className={style.input}
          type="string"
          placeholder="Фильм"
          aria-label="search movies"
          value={
            savedMoviesStatus
              ? saveKeyWord
                ? saveKeyWord
                : ''
              : keyWord
              ? keyWord
              : ''
          }
          onChange={savedMoviesStatus ? handleSaveInput : handleInput}
          required
        />
        <button
          className={style.button}
          onClick={handleSearch}
        >
          Найти
        </button>
      </form>

      {validMess ? <p className={style.span}>{validMess}</p> : ''}

      <div className={style.option_container}>
        <CheckBox
          savedMoviesStatus={savedMoviesStatus}
          handleShortSave={handleShortSave}
          handleShort={handleShort}
          buttonState={buttonState}
        ></CheckBox>
        <span className={style.option_span}>Короткометражки</span>
      </div>
    </section>
  );
}

export default Search;
