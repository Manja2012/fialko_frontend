import AboutMePage from "../AboutMePage/AboutMePage";
import Courses from "../../components/Course/Courses";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Accueil - École de coloration en ligne</title>
        <meta
          name="description"
          content="Bienvenue à l'École de coloration en ligne par Maria Fialko. Découvrez nos cours de coloration pour styliste débutant et amateur."
        />
      </Helmet>
      <AboutMePage />
      <Courses />
    </>
  );
};
export default HomePage;
