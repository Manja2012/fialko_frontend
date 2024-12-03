import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/сardContext";

const Success = () => {
  const navigate = useNavigate();
  const { clearCart, cart } = useCart();

  const handleClearCart = () => {
    const paidCourses = cart.map((item) => item._id);
    localStorage.setItem("paidCourses", JSON.stringify(paidCourses));
    clearCart();
    navigate("/");
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="title">Le cours a été payé avec succès!</h2>
        <button className="button" onClick={handleClearCart}>
          OK
        </button>
      </div>
    </section>
  );
};

export default Success;
