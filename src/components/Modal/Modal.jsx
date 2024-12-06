import style from'./Modal.module.scss';

const Modal = ({ children, title }) => {
  return (
    <>
      <div className={style.overlay}></div>
      <div className={style.modal}>
        <div className={style.modal__container}>
          <div className={style.modal__content}>
            <h2 className={style.title}>{title}🍪🍪🍪</h2>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
export default Modal;