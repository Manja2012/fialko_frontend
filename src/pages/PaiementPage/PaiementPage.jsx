import StripeCheckout from "../../stripe/stripe-checkout";
import { Helmet } from "react-helmet";

const PaiementPage = () => {
  return (
    <>
      <Helmet>
        <title>Paiement sécurisé - École de coloration en ligne</title>
        <meta
          name="description"
          content="Finalisez votre achat de cours en toute sécurité avec notre système de paiement Stripe."
        />
      </Helmet>
      <StripeCheckout />
    </>
  );
};
export default PaiementPage;
