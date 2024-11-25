import PhotoAdmin from "/images/profil.webp";
// import BackgroundImage from "../../images/profil2.webp"; // Новый фон
import style from "./AboutMePage.module.scss";

const AboutMePage = () => {
  return (
    <main>
      <div className="container">
        <section className="section border">
          <h2 className={style.card__title2}>A propos de moi</h2>
          <div
            className={style.card}
            // style={{ backgroundImage: `url(${BackgroundImage})` }}
          >
            <div className={style.card__block}>
              <h1 className={style.card__title}>Maria Fialko</h1>
              <p className={style.card__description}>
                coiffeur-styliste-coloriste
              </p>
              <p className={style.card__text}>
                Je m'appelle Maria Fialko. J'ai parcouru le chemin de coiffeuse
                à directrice de salon, et je peux dire avec assurance que mes 20
                années de travail et de formation continue ont été consacrées à
                mon véritable désir : rendre les cheveux des femmes magnifiques.
                Mes clientes m'ont toujours donné la motivation d'aller plus
                loin, car ce qu'il y a de plus inspirant dans cette profession,
                c'est d'être recherchée. Mes élèves, après leurs premiers pas
                timides dans un salon, devenaient de véritables Professionnels
                avec un grand "P", confiants en eux-mêmes. Enseigner, donner
                confiance, et montrer les choses les plus complexes de manière
                simple — tel est l'objectif de mes cours.
              </p>
            </div>
            <div className={style.card__image_div}>
              <img
                className={style.card__image}
                src={PhotoAdmin}
                alt="photo admin"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutMePage;
