import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromApi } from "../utils/helpers/stripe";
import style from "../components/ContactsForm/ContactsForm.module.scss"; 

const StripeCheckout = () => {
  const [email, setEmail] = useState("");
  const stripe = useStripe();

  const handleCheckout = async (event) => {
    event.preventDefault();

    const panier = JSON.parse(localStorage.getItem("cart"));

    const line_items = panier.map((article) => ({
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: article.price * 100,
        product_data: {
          name: article.name,
          description: article.content,
        },
      },
    }));

    const { sessionId } = await fetchFromApi(
      "/stripe/create-checkout-session",
      {
        body: { line_items, customer_email: email },
      }
    );

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleCheckout}>
        <input
          className={style.form__input}
          type="email"
          name="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          value={email}
          required
        />
        <button className={style.form__button} type="submit">
          CHECKOUT
        </button>
      </form>
    </div>
  );
};

export default StripeCheckout;
