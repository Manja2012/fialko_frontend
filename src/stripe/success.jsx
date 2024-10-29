import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/сardContext"; // Импортируйте контекст

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Получите функцию очистки корзины

  const handleClearCart = () => {
    clearCart(); // Очищаем корзину с помощью функции из контекста
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
