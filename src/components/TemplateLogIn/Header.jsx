import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "/images/logo.svg";
import { GrClose, GrMenu } from "react-icons/gr";
import { FaShoppingBasket } from "react-icons/fa";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useCart } from "../../contexts/сardContext";
import style from "../Template/Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <div className={style.flex_logo}>
          <div className={style.logo}>
            <Link to="/">
              <img className={style.logo_img} src={Logo} alt="Logo" />
            </Link>
          </div>
          <nav>
            <ul className={style.nav}>
              <li className={style.nav__item}>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.nav__link} ${style.nav__link_current}`
                      : `${style.nav__link}`
                  }
                  to="/propos"
                >
                  A propos de moi
                </NavLink>
              </li>
              <li className={style.nav__item}>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.nav__link} ${style.nav__link_current}`
                      : `${style.nav__link}`
                  }
                  to="/courses"
                >
                  Cours
                </NavLink>
              </li>
              <li className={style.nav__item}>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.nav__link} ${style.nav__link_current}`
                      : `${style.nav__link}`
                  }
                  to="/photos"
                >
                  Photos
                </NavLink>
              </li>
              <li className={style.nav__item}>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.nav__link} ${style.nav__link_current}`
                      : `${style.nav__link}`
                  }
                  to="/contacts"
                >
                  Contacts
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <ul
          className={`${style.nav} ${style.nav__margin} ${style.desktop_nav}`}
        >
          <Link to="/panier" className={style.basket_link}>
            <div className={style.basket_icon_container}>
              <FaShoppingBasket className={style.basket_icon} size={30} />
              {cartCount > 0 && (
                <span className={style.basket_counter}>{cartCount}</span>
              )}
            </div>
          </Link>
          <LogoutButton />
          <li className={style.nav__item_logIn}>
            <Link className={style.nav__link} to="/profile">
              Mon compte
            </Link>
          </li>
        </ul>

        <div className={style.mobil_header}>
          <div className={style.mobile_icons}>
            <Link to="/panier" className={style.basket_link}>
              <div className={style.basket_icon_container}>
                <FaShoppingBasket className={style.basket_icon} size={30} />
                {cartCount > 0 && (
                  <span className={style.basket_counter}>{cartCount}</span>
                )}
              </div>
            </Link>
            <LogoutButton />
            <Link className={style.nav__link} to="/profile">
              Mon compte
            </Link>
          </div>
          <button
            onClick={handleIsOpen}
            className={`${style.menu_button} ${isOpen ? style.is_open : ""}`}
          >
            <GrClose
              aria-label="menu_mobile"
              className={style.icon_close}
              size={40}
            />
            <GrMenu
              aria-label="menu_mobile"
              className={style.icon_menu}
              size={40}
            />
          </button>
        </div>
      </div>
      <div
        className={`${style.mobil_menu} ${isOpen ? style.is_open : ""}`}
        id="mobil-menu"
        data-menu
      >
        <ul className={style.mobil_menu__nav}>
          <li className={style.nav__item}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={style.link}
              to="/propos"
            >
              A propos de moi
            </NavLink>
          </li>
          <li className={style.nav__item}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={style.link}
              to="/courses"
            >
              Cours
            </NavLink>
          </li>
          <li className={style.nav__item}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={style.link}
              to="/photos"
            >
              Photos
            </NavLink>
          </li>
          <li className={style.nav__item}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={style.link}
              to="/contacts"
            >
              Contacts
            </NavLink>
          </li>
        </ul>
      </div>
      <h1 className={style.title}>
        École de coloration <br /> en ligne par Maria Fialko
      </h1>
    </header>
  );
};

export default Header;
