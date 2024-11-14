import { Link } from "react-router-dom";
import style from "./AdminPage.module.scss"
// import AddCourseForm from "../../components/AddCourseForm/AddCourseForm";
const AdminPage = () => {
  return (
    <section className="section">
      <div className="container">
        <ul className={style.list}>
        <li>
          <Link className="button" to="/add-course">
            Ajouter un cours
          </Link>
        </li>
        <li>
          <Link className="button" to="/courses">
            Supprimer/modifier le cours
          </Link>
        </li>
        <li>
          <Link className="button" to="/courses">
            Supprimer/modifier l'avis
          </Link>
        </li>
      </ul>
      </div>
      
    </section>
      

  );
};

export default AdminPage;
