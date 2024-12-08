import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Helmet } from "react-helmet";

const RegistrationPage = () => {
  return (
    <>
      <Helmet>
        <title>Inscription - École de coloration en ligne</title>
        <meta
          name="description"
          content="Inscrivez-vous pour accéder à nos cours de coloration et améliorer vos compétences."
        />
      </Helmet>
      <RegistrationForm />
    </>
  );
};
export default RegistrationPage;
