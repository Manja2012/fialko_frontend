import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { requestPasswordReset } from "../../api/api-client";
import style from "../ContactsForm/ContactsForm.module.scss";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await requestPasswordReset(email);
      toast.success("Un email de réinitialisation a été envoyé !", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'envoi de l'email.";
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
          <h1 className="title">Mot de passe oublié</h1>
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
                  type="email"
                  id="email"
                  required
                />
              </div>
            </fieldset>
            <button className="button" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordForm;
