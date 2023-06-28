import loader from "../../image/loading.gif";
import style from './Preloader.module.scss'

function Preloader ( {onLoading, message} ) {
  return (
    <>
      <div className={style.container}>
        {onLoading ? <img className={style.load_image} src={loader} alt='loading...'></img> : <span className={style.message}>{message}</span> }
      </div>
    </>
  )
}

export default Preloader
