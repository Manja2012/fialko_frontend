import Courses from "../../components/Course/Courses";
import { Helmet } from "react-helmet";

const CoursesPage = () => {
  return (
    <>
      <Helmet>
        <title>Nos cours</title>
        <meta
          name="description"
          content="Explorez nos cours de coloration pour apprendre et perfectionner vos compétences."
        />
      </Helmet>
      <Courses />
    </>
  );
};
export default CoursesPage;
