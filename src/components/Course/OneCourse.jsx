import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCourseById,
  createReservation,
  checkReservation,
} from "../../api/api-client.js";
import style from "./CourseCard.module.scss";
import { useUser } from "../../contexts/userContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddReview from "../AddReview/AddReview.jsx";
import CourseCard from "./CourseCard.jsx";
import { useCart } from "../../contexts/сardContext.jsx";

const OneCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [hasReserved, setHasReserved] = useState(false);
  const { user } = useUser();
  const { cart, addToCart } = useCart(); // Получаем cart из контекста

  useEffect(() => {
    fetchCourse();
    fetchReservationStatus();
  }, []);

  const notify = () =>
    toast.error(`Vous devez vous inscrire`, {
      className: style.errorMessage,
    });

  const confirmation = () =>
    toast.success(`Le cours a été ajouté avec succès au panier`, {
      className: style.successMessage,
    });

  const confirmationReservation = () =>
    toast.success(`Le cours a été réservé`, {
      className: style.successMessage,
    });

  const alreadyInCart = () =>
    toast.error(`Ce cours est déjà dans le panier`, {
      className: style.errorMessage,
    });

  const alreadyReserved = () =>
    toast.error(`Vous avez déjà réservé ce cours`, {
      className: style.errorMessage,
    });

  const fetchCourse = async () => {
    try {
      const { data } = await getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error("Échec de la récupération du cours:", error);
    }
  };

  const fetchReservationStatus = async () => {
    if (user) {
      try {
        const reservationStatus = await checkReservation(id);
        setHasReserved(reservationStatus);
      } catch (error) {
        console.error("Échec de la vérification de la réservation :", error);
      }
    }
  };

  const addToCartHandler = () => {
    if (!user) {
      notify();
      return;
    }

    // Проверяем, добавлен ли курс в корзину
    const isCourseInCart = cart.some((item) => item._id === course._id);

    if (isCourseInCart) {
      alreadyInCart(); // Уведомление, если курс уже в корзине
    } else {
      addToCart(course);
      confirmation();
    }
  };

  const handleReservation = async () => {
    if (!isAgreed) {
      alert("Vous devez accepter les termes de la réservation");
      return;
    }

    if (!user) {
      notify();
      return;
    }

    if (hasReserved) {
      alreadyReserved(); // Уведомление, если курс уже зарезервирован
      return;
    }

    try {
      await createReservation({
        user: user._id,
        course: id,
      });
      confirmationReservation();
      setIsModalOpen(false);
      setHasReserved(true);
    } catch (error) {
      console.error("La réservation a échoué :", error);
      alert("La réservation a échoué.");
    }
  };

  const handleReviewAdded = (newReview) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      review: [...prevCourse.review, newReview],
    }));
    fetchReservationStatus(); // Обновляем состояние после добавления отзыва
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <main className="container section">
        <CourseCard
          id={id}
          name={course.name}
          content={course.content}
          category={course.category}
          picture={course.picture}
          price={course.price}
          showMore={false}
        />
        <div>
          <button className="button" onClick={() => setIsModalOpen(true)}>
            Reserve
          </button>
          <button className="button" onClick={addToCartHandler}>
            Ajouter au panier
          </button>
        </div>

        <h3 className={style.card__review}>Reviews</h3>
        <ul>
          {course.review.map((review, index) => (
            <li className={style.card__item} key={index}>
              {review.comment} - {review.rating}
              {user &&
                user.isAdmin && ( // Условие для отображения ссылки
                  <Link
                    className={style.card__link}
                    to={`/update-reviews/${review._id}`}
                  >
                    modifier l'avis
                  </Link>
                )}
            </li>
          ))}
        </ul>

        {user && hasReserved && (
          <>
            <AddReview courseId={id} onReviewAdded={handleReviewAdded} />
          </>
        )}

        {isModalOpen && (
          <div className={style.modal}>
            <div className={style.modalContent}>
              <h2 className={style.card__title}>Confirmez votre réservation</h2>
              <div className={style.courseCard}>
                <h3 className={style.card__title}>{course.name}</h3>
                <img
                  src={`${"http://localhost:3001/temp/"}${course.picture}`}
                  alt={course.name}
                />
                <p>{course.content}</p>
                <p>Catégorie: {course.category}</p>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                J'accepte de réserver ce cours
              </label>
              <button onClick={handleReservation}>
                Confirmez votre réservation
              </button>
              <button onClick={() => setIsModalOpen(false)}>Annuler</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default OneCourse;
