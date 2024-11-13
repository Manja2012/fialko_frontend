import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/сardContext";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart, cart } = useCart(); // Получаем cart из контекста

  const handleClearCart = () => {
    const paidCourses = cart.map((item) => item._id); // Получаем IDs оплаченных курсов
    localStorage.setItem("paidCourses", JSON.stringify(paidCourses)); // Сохраняем оплаченные курсы
    clearCart(); // Очищаем корзину
    navigate("/"); // Перенаправление на главную страницу
  };

  return (
    <div className="container">
      <h2>Success!</h2>
      <button className="button" onClick={handleClearCart}>
        OK
      </button>
    </div>
  );
};

export default SuccessPage;
