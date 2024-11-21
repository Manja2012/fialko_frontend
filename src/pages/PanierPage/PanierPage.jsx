import { Link } from "react-router-dom";
import { useCart } from "../../contexts/сardContext";
import CourseCard from "../../components/Course/CourseCard";
import style from "./PanierPage.module.scss";

const Panier = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <>
      <section className="section">
        <div className="container">
          {cart.length === 0 ? (
            <p className={style.cartCard__text}>
              La panier est actuellement vide.
            </p>
          ) : (
            <>
              <ul className="section">
                {cart.map((card) => (
                  <li key={card._id} className={style.cartCard__item}>
                    <div>
                      {" "}
                      <CourseCard
                        id={card._id}
                        name={card.name}
                        content={card.content}
                        category={card.category}
                        picture={card.picture}
                        price={card.price}
                        isCartPage={true}
                      />
                    </div>
                    <div>
                      <button
                        className={style.cartCard__removeButton}
                        onClick={() => removeFromCart(card._id)}
                      >
                        Retirer du panier
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p>Coût total : {total} €</p>
              <Link className="link" to="/paiement">
                <button className="button">Payer</button>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Panier;
