import { useUser } from "../../contexts/userContext.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import style from "./UserPage.module.scss";

const UserPage = () => {
  const { user } = useUser();

  return (
    <>
      <Helmet>
        <title>Mon espace - École de coloration en ligne</title>
        <meta
          name="description"
          content="Gérez vos informations personnelles, vos cours achetés et vos avis dans votre espace personnel."
        />
      </Helmet>
      <div className="container">
        <section className="section">
          <h1 className={style.title}>Mon compte</h1>
          <p className={style.text}>Bienvenue, {user.email}!</p>
          {user.isAdmin && (
            <Link to="/admin" className={style.adminLink}>
              Aller à la page d'administration
            </Link>
          )}
        </section>
      </div>
    </>
  );
};

export default UserPage;
