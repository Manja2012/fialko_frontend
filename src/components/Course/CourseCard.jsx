import React from "react";
import { Link } from "react-router-dom";
import style from "./CourseCard.module.scss";
import config from "../../config";

const CourseCard = ({
  id,
  name,
  content,
  category,
  picture,
  price,
  showOverlay = true,
  isSingleCourse = false,
  isCartPage = false,
}) => {
  const pictureUrl = `${config.photoApi}temp/`;

  return (
    <Link className={style.card__link} to={`/courses/${id}`}>
      <div
        className={`${style.card} ${isSingleCourse ? style.singleCard : ""} ${
          isCartPage ? style.cartCard : ""
        }`}
      >
        <div
          className={`${
            isCartPage
              ? style.cartCard__imageWrapper
              : isSingleCourse
              ? style.singleCard__imageWrapper
              : style.card__imageWrapper
          }`}
        >
          <img
            className={`${
              isCartPage
                ? style.cartCard__image
                : isSingleCourse
                ? style.singleCard__image
                : style.card__image
            }`}
            src={`${pictureUrl}${picture}`}
            alt={name}
          />
          {showOverlay && !isSingleCourse && !isCartPage && (
            <div className={style.card__overlay}>
              <p className={style.card__overlay_text}>{content}</p>
            </div>
          )}
        </div>

        <div
          className={`${
            isSingleCourse ? style.singleCard__details : style.card__details
          }`}
        >
          <h2
            className={`${
              isSingleCourse ? style.singleCard__title : style.card__title
            }`}
          >
            {name}
          </h2>
          <p
            className={`${
              isSingleCourse ? style.singleCard__text : style.card__text
            }`}
          >
            Category: {category}
          </p>

          {isSingleCourse && (
            <p
              className={`${style.singleCard__text} ${style.singleCard__content}`}
            >
              {content}
            </p>
          )}

          {isCartPage ? (
            <div className={style.cartCard__details}>
              <span className={style.cartCard__price}>Price: {price} €</span>
            </div>
          ) : (
            <div
              className={`${
                isSingleCourse
                  ? style.singleCard__text_price
                  : style.card__text_price
              }`}
            >
              Price: {price}$
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
