import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom"; // Импорт useNavigate
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPassword } from "../../api/api-client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import style from "../ContactsForm/ContactsForm.module.scss";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(10, "Le mot de passe doit contenir au moins 10 caractères")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .required("Le mot de passe est obligatoire"),
});

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate(); // Инициализация navigate
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await resetPassword(token, data.newPassword);
      toast.success("Mot de passe réinitialisé avec succès !", {
        position: "top-right",
        autoClose: 5000,
      });

      // Перенаправление на страницу логина
      setTimeout(() => {
        navigate("/log-in");
      }, 2000); // Добавляем небольшую задержку, чтобы пользователь мог увидеть сообщение
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la réinitialisation du mot de passe.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Réinitialiser le mot de passe</h1>
          <form
            className="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className={style.fieldset}>
              <label className={style.form__label}>
                Nouveau mot de passe
                <div style={{ position: "relative" }}>
                  <input
                    className={style.form__input}
                    type={showPassword ? "text" : "password"}
                    {...register("newPassword")}
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
                {errors.newPassword && (
                  <p className={`${style.error} custom-error-class`}>
                    {errors.newPassword.message}
                  </p>
                )}
              </label>
            </fieldset>
            <button className="button" type="submit">
              Réinitialiser
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ResetPasswordForm;
