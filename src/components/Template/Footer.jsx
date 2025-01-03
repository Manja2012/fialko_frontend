import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <section className={style.footer}>
        <div className={style.footer__list}>
          <ul>
            <li className={style.footer__title}>Plan du Site</li>
            <li className={style.footer__item}>
              <Link className={style.footer__link} to="/propos">
                A propos de moi
              </Link>
            </li>
            <li className={style.footer__item}>
              <Link className={style.footer__link} to="/courses">
                Cours
              </Link>
            </li>
            <li className={style.footer__item}>
              <Link className={style.footer__link} to="/photos">
                Photos
              </Link>
            </li>

            <li className={style.footer__item}>
              <Link className={style.footer__link} to="/contacts">
                Contacts
              </Link>
            </li>
            <li className={style.footer__item}>
              <Link className={style.footer__link} to="/legalnotice">
                Mention legales
              </Link>
            </li>
            <li className={style.footer__item}>
              <Link className={style.footer__link} to="/rgpd">
                RGPD
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.footer__list}>
          <ul>
            <li>
              <div className={style.social}>
                <Link to="#" target="_blank" className={style.social__link}>
                  <BsFacebook className={style.social__icon} size={90} />
                </Link>
                <Link to="#" target="_blank" className={style.social__link}>
                  <BsInstagram className={style.social__icon} size={90} />
                </Link>
                <Link to="#" target="_blank" className={style.social__link}>
                  <BsTelegram className={style.social__icon} size={90} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
