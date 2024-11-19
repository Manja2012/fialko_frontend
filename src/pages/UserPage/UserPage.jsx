import { useUser } from "../../contexts/userContext.jsx";
import { Link } from "react-router-dom";
import style from "./UserPage.module.scss";

const UserPage = () => {
  const { user } = useUser();

  return (
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
  );
};

export default UserPage;
