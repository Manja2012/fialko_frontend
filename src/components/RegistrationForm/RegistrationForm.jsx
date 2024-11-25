import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { register } from "../../api/api-client.js";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import style from "../ContactsForm/ContactsForm.module.scss";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .required("Le nom est obligatoire"),
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .min(10, "Le mot de passe doit contenir au moins 10 caractères")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .required("Le mot de passe est obligatoire"),
});

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await register(data);
      navigate("/log-in");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Créer un Compte</h1>
        <form
          className="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className={style.fieldset}>
            <label className={style.form__label}>
              nom d'utilisateur
              <input
                className={style.form__input}
                type="text"
                {...registerInput("name")}
              />
              {errors.name && (
                <p className={`${style.error} custom-error-class`}>
                  {errors.name.message}
                </p>
              )}
            </label>
            <label className={style.form__label}>
              email
              <input
                className={style.form__input}
                type="email"
                {...registerInput("email")}
              />
              {errors.email && (
                <p className={`${style.error} custom-error-class`}>
                  {errors.email.message}
                </p>
              )}
            </label>
            <label className={style.form__label}>
              mot de passe
              <div style={{ position: "relative" }}>
                <input
                  className={style.form__input}
                  type={showPassword ? "text" : "password"}
                  {...registerInput("password")}
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
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              {errors.password && (
                <p className={`${style.error} custom-error-class`}>
                  {errors.password.message}
                </p>
              )}
            </label>
          </fieldset>
          <button className="button" type="submit">
            S'inscrire
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
