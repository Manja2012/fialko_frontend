import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext.jsx'; 
import css from '../ContactsForm/ContactsForm.module.scss';
import style from './LogIn.module.scss';

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const user = await login(email, password); 

      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend className={style.legend}>Connexion</legend>
          <div>
            <label className={css.form__label} htmlFor="email">Adresse email:</label>
            <input className={css.form__input} value={email} onChange={event => setEmail(event.target.value)} type="text" id="email" />
          </div>
          <div>
            <label className={css.form__label} htmlFor="password">Mot de passe:</label>
            <input className={css.form__input} value={password} onChange={event => setPassword(event.target.value)} type="password" id="password" />
          </div>
          <div>
            <button className={style.button} type="submit">Se connecter</button>  
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LogInForm;
