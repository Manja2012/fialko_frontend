import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/сardContext";
import style from "../components/ContactsForm/ContactsForm.module.scss"; 

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart, cart } = useCart();

  const handleClearCart = () => {
    const paidCourses = cart.map((item) => item._id);
    localStorage.setItem("paidCourses", JSON.stringify(paidCourses));
    clearCart();
    navigate("/");
  };

  return (
    <div className={style.form}>
      <h2 className={style.title}>Success!</h2>
      <button className={style.form__button} onClick={handleClearCart}>
        OK
      </button>
    </div>
  );
};

export default SuccessPage;
