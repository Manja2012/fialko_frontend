import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import style from "../Course/CourseCard.module.scss";
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
      <div className={style.rating}>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className={style.star} />
      ))}
      {halfStar && <FaStarHalfAlt className={style.star}/>}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className={style.star} />
      ))}
    </div>
  );
};

export default RatingStars;
