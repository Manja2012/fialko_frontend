import React from "react";
import style from "./DataRegisterPage.module.scss";


const DataRegisterPage = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">
            Registre de traitement des données personnelles
          </h1>
          <div className={style.text}>
            <p>
              <strong>Détails du contact:</strong>
              <br />
              Nom de l'entreprise: École de coloration en ligne par Maria Fialko
              <br />
              Adresse: rue Borodinska 5, Kyiv, Ukraine, 01001
              <br />
              Email:{" "}
              <span className={style.text__accent}>fialko_mari@gmail.com</span>
              <br />
              Téléphone: <span className={style.text__accent}>0768466995</span>
            </p>
            <p>
              <strong>Responsable du traitement:</strong>
              <br />
              Maria Fialko
              <br />
              Email:{" "}
              <span className={style.text__accent}>maria_fialko@gmail.com</span>
              <br />
              Téléphone: <span className={style.text__accent}>076544542</span>
            </p>
            <p>
              <strong>Activité de traitement des données régulières:</strong>
              <br />
              Catégories de données personnelles: adresse mail, numéro de
              téléphone
              <br />
              Catégorie de personnes concernées: Clients
              <br />
              Base de traitement: le consentement
              <br />
              Finalité du traitement: gestion d'une prestation de service
              <br />
              Destinataire des données: un service interne de mon entreprise
            </p>
            <p>
              <strong>Durée de conservation des données:</strong>
              <br />
              Précautions de sécurité: Anonymisation des données personnelles
            </p>
            <p>
              <strong>
                Activité de traitement des données personnelles sensibles:
              </strong>
              <br />
              Non applicable
            </p>
            <p>
              Date de création du registre: 01 septembre 2024
              <br />
              Date des mises à jour: 01 décembre 2024
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataRegisterPage;
