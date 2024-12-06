
import style from "./LegalNotice.module.scss";


const LegalNotice = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title"> Mentions légale</h1>
          <div className={style.text}>
            Le présent site est la propriété de{" "}
            <span className={style.text__accent}>
              École de coloriage en ligne par Maria Fialko
            </span>{" "}
            <br />
            Siège social : rue Borodinska 5 <br />
            Kyiv, Ukraine, 01001 <br />
          </div>
          <p className={style.text}>
            Immatriculée au RCS le 15 juin 2020 sous le numéro 123 456 789.{" "}
            <br />
            N° identifiant TVA : FR12345678901 <br />
          </p>
          <div className={style.text}>
            Directeur de la publication du site : Maria Fialko <br />
            Ce site est hébergé par :
            <br /> Netlify pour la partie front-end
            <br /> Adresse : Netlify, 2325 3rd Street, Suite 296, San Francisco,
            California 94107, USA
            <br /> Render pour la partie back-end
            <br /> Adresse : Render, 525 Market Street, 25th Floor, San
            Francisco, CA 94105, USA
            <br /> En cas de dysfonctionnement du site ou pour toute question
            relative à nos services, vous pouvez nous joindre au{" "}
            <span className={style.text__accent}>076544542</span>
          </div>
          <div className={style.text}>
            Vous pouvez nous contacter par mail à l'adresse suivante :{" "}
            <span className={style.text__accent}>maria_fialko@gmail.com</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalNotice;
