import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import style from "../ContactsForm/ContactsForm.module.scss";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(email, password);
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      // Если ошибка вызвана превышением лимита попыток
      if (error.response && error.response.status === 429) {
        toast.error(
          "Trop de tentatives échouées. Veuillez réessayer plus tard.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        toast.error("Email ou mot de passe incorrect", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Connexion</h1>
          <form className="form" onSubmit={handleSubmit}>
            <fieldset className={style.fieldset}>
              <div>
                <label className={style.form__label} htmlFor="email">
                  Adresse email:
                </label>
                <input
                  className={style.form__input}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="text"
                  id="email"
                />
              </div>
              <div>
                <label className={style.form__label} htmlFor="password">
                  Mot de passe:
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className={style.form__input}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    id="password"
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </span>
                </div>
              </div>
            </fieldset>
            <button className="button" type="submit">
              Se connecter
            </button>
            <p style={{ marginTop: "1rem" }}>
              <Link
                to="/forgot-password"
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                Mot de passe oublié ?
              </Link>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default LogInForm;
