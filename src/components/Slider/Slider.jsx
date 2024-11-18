import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Slider.module.scss";

// Custom arrow components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
};

function Slide() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    rows: 1,
    slidesPerRow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="container">
      <section className="section">
        <Slider {...settings}>
          <div>
            <img
              className={style.image}
              src="/src/images/photo1.webp"
              alt="Cours de coloration des cheveux pour débutants"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo2.webp"
              alt="Cours avancé de coloration des cheveux"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo3.webp"
              alt="Techniques de coloration capillaire pour cheveux blonds"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo4.webp"
              alt="Formation en balayage et mèches pour cheveux foncés"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo5.webp"
              alt="Cours sur la coloration permanente des cheveux"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo6.webp"
              alt="Formation sur les colorations naturelles sans ammoniaque"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo7.webp"
              alt="Apprentissage du coloriste : réussir la coloration des racines"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo8.webp"
              alt="Cours de coloration créative pour cheveux courts"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo9.webp"
              alt="Formation sur les dégradés et ombré pour cheveux longs"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo10.webp"
              alt="Les bases de la coloration capillaire pour les débutants"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo11.webp"
              alt="Techniques de coloration de cheveux pour femmes de plus de 40 ans"
            />
          </div>
          <div>
            <img
              className={style.image}
              src="/src/images/photo12.webp"
              alt="Cours avancé de colorimétrie pour les stylistes professionnels"
            />
          </div>
        </Slider>
      </section>
    </div>
  );
}

export default Slide;
