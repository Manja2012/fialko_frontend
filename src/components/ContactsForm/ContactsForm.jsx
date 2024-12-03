import { StrictMode, useState } from "react";
import { sendMessage } from "../../api/api-client.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Импорт navigate
import Img from "/images/profil2.webp";
import "react-toastify/dist/ReactToastify.css";
import style from "./ContactsForm.module.scss";

const ContactsForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Инициализация navigate

  const notify = () =>
    toast.error(`S'il vous plaît, remplissez le champ de texte`);
  const confirmation = () =>
    toast.success(`Votre message a été envoyé avec succès`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      notify();
    } else {
      try {
        await sendMessage({
          email,
          name,
          phone,
          message,
        });
        confirmation();

        // Очистка формы
        setName("");
        setEmail("");
        setMessage("");
        setPhone("");

        // Переход на главную страницу
        setTimeout(() => navigate(`/`), 2000);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <StrictMode>
      <section className={style.flex}>
        <div className={style.form} id="contacts">
          <h1 className={style.title}>Contactez-nous</h1>
          <form onSubmit={handleSubmit}>
            <label className={style.form__label} htmlFor="name">
              Nom complet*
            </label>
            <input
              className={style.form__input}
              required
              type="text"
              name="name"
              id="name"
              value={name} // Добавлено значение
              onChange={(event) => setName(event.target.value)}
            />
            <label className={style.form__label} htmlFor="email">
              Email*
            </label>
            <input
              className={style.form__input}
              required
              type="email"
              name="email"
              id="email"
              value={email} // Добавлено значение
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className={style.form__label} htmlFor="phone">
              Numéro de téléphone*
            </label>
            <input
              className={style.form__input}
              required
              type="tel"
              name="phone"
              id="phone"
              value={phone} // Добавлено значение
              onChange={(event) => setPhone(event.target.value)}
            />
            <div>
              <label className={style.form__label} htmlFor="message">
                Message*
              </label>
              <textarea
                className={style.form__comment}
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={message} // Добавлено значение
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
            <p className={style.form__text_star}>*champs obligatoire</p>
            <div>
              <button type="submit" className={style.form__button}>
                Ok
              </button>
            </div>
          </form>
        </div>
        <div className={style.form__image}>
          <img
            className={style.form__photo}
            src={Img}
            alt="photo Maria Fialko"
          />
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={style.toastContainer}
      />
    </StrictMode>
  );
};

export default ContactsForm;
