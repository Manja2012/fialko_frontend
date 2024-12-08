import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import style from "./AdminPage.module.scss";
const AdminPage = () => {
  return (
    <>
      <Helmet>
        <title>Page administrateur</title>
        <meta
          name="description"
          content="Gérez les cours, les utilisateurs et les avis depuis le tableau de bord administrateur."
        />
      </Helmet>
      <section className="section">
        <div className="container">
          <h1 className="title">Page d'administration</h1>
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
    </>
  );
};

export default AdminPage;
