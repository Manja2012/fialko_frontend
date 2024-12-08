import OneCourse from "../../components/Course/OneCourse";
import { Helmet } from "react-helmet";

const OneCoursePage = () => {
  return (
    <>
      <Helmet>
        <title>Details du cours - École de coloration en ligne</title>
        <meta
          name="description"
          content="Explorez les détails de ce cours de coloration. Apprenez les techniques et astuces de Maria Fialko."
        />
      </Helmet>
      <OneCourse />
    </>
  );
};
export default OneCoursePage;
