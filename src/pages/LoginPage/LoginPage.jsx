import LogInForm from "../../components/LogInForm/LogInForm"
import { Helmet } from "react-helmet";

const LogInPage = () =>{  

  return (
    <>
      <Helmet>
        <title>Connexion - École de coloration en ligne</title>
        <meta
          name="description"
          content="Connectez-vous pour accéder à vos cours, vos achats et vos avis."
        />
      </Helmet>
      <LogInForm />
    </>
  );
}
export default LogInPage;