// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {
//   getCourseById,
//   deleteCourse,
//   updateCourse,
//   deleteReview,
// } from "../../api/api-client";
// import style from "./CourseCard.module.scss";
// import { useUser } from "../../contexts/userContext.jsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddReview from "../AddReview/AddReview.jsx";
// import CourseCard from "./CourseCard.jsx";
// import RatingStars from "../RatingStars/RatingStars";
// import { useCart } from "../../contexts/сardContext.jsx";
// import { FaShoppingCart, FaTrash, FaPlus, FaEdit, FaRegTrashAlt } from "react-icons/fa";

// const OneCourse = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const { user } = useUser();
//   const { cart, addToCart } = useCart();
//   const [hasPaid, setHasPaid] = useState(false);

//   useEffect(() => {
//     fetchCourse();
//     checkPaymentStatus();
//   }, []);

//   const notifyError = (message) =>
//     toast.error(message, { className: style.errorMessage });
//   const notifySuccess = (message) =>
//     toast.success(message, { className: style.successMessage });

//   const fetchCourse = async () => {
//     try {
//       const { data } = await getCourseById(id);
//       setCourse(data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du cours:", error);
//     }
//   };

//   const checkPaymentStatus = () => {
//     const paidCourses = JSON.parse(localStorage.getItem("paidCourses")) || [];
//     if (paidCourses.includes(id)) {
//       setHasPaid(true);
//     }
//   };

//   const addToCartHandler = () => {
//     if (!user) {
//       notifyError("Vous devez vous connecter pour ajouter un cours");
//       return;
//     }

//     const isCourseInCart = cart.some((item) => item._id === course._id);
//     if (isCourseInCart) {
//       notifyError("Ce cours est déjà dans le panier");
//     } else {
//       addToCart(course);
//       notifySuccess("Le cours a été ajouté au panier avec succès");
//     }
//   };

//   const handleReviewAdded = (newReview) => {
//     setCourse((prevCourse) => ({
//       ...prevCourse,
//       review: [...prevCourse.review, newReview],
//     }));
//   };

//   const handleDeleteCourse = async () => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours?")) {
//       try {
//         await deleteCourse(course._id);
//         notifySuccess("Le cours a été supprimé avec succès");
//         navigate("/courses"); // Redirige après suppression
//       } catch (error) {
//         console.error("Erreur lors de la suppression du cours:", error);
//         notifyError("Erreur lors de la suppression du cours");
//       }
//     }
//   };

//   const handleEditCourse = () => {
//     navigate(`/update-course/${course._id}`, { state: course });
//   };

//   const handleDeleteReview = async (reviewId) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer cet avis?")) {
//       try {
//         await deleteReview(reviewId);
//         setCourse((prevCourse) => ({
//           ...prevCourse,
//           review: prevCourse.review.filter((review) => review._id !== reviewId),
//         }));
//         notifySuccess("L'avis a été supprimé avec succès");
//       } catch (error) {
//         console.error("Erreur lors de la suppression de l'avis:", error);
//         notifyError("Erreur lors de la suppression de l'avis");
//       }
//     }
//   };

//   const handleEditReview = (review) => {
//     navigate(`/update-reviews/${review._id}`, { state: review });
//   };

//   if (!course) {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <>
//       <ToastContainer />
//       <main className="container section">
//         <div className={`${style.courseDetail} ${style.singleCard}`}>
//           <div>
//             <CourseCard
//               id={course._id}
//               name={course.name}
//               content={course.content}
//               category={course.category}
//               picture={course.picture}
//               price={course.price}
//               showOverlay={false}
//               isSingleCourse={true}
//             />
//             <button
//               className={style.addToCartButton}
//               onClick={addToCartHandler}
//             >
//               <FaShoppingCart />
//             </button>
//             {user && user.isAdmin && (
//               <div className={style.adminActions}>
//                 <Link to="/add-course" className={style.addButton}>
//                   <FaPlus /> Ajouter un cours
//                 </Link>
//                 <button onClick={handleEditCourse} className={style.editButton}>
//                   <FaEdit /> Modifier
//                 </button>
//                 <button
//                   onClick={handleDeleteCourse}
//                   className={style.deleteButton}
//                 >
//                   <FaTrash /> Supprimer
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className={style.courseDetail__content}>
//             {course.review.length > 0 && (
//               <h3 className={style.card__review}>Avis</h3>
//             )}
//             <ul className={style.reviewList}>
//               {course.review.map((review) => (
//                 <li className={style.card__item} key={review._id}>
//                   <RatingStars rating={review.rating} />
//                   {review.comment}
//                   {user && user.isAdmin && (
//                     <div className={style.reviewActions}>
//                       <button
//                         onClick={() => handleEditReview(review)}
//                         className={style.editButton}
//                       >
//                         <FaEdit /> Modifier
//                       </button>
//                       <button
//                         onClick={() => handleDeleteReview(review._id)}
//                         className={style.deleteButton}
//                       >
//                         <FaRegTrashAlt /> Supprimer
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//             {user && hasPaid && (
//               <AddReview courseId={id} onReviewAdded={handleReviewAdded} />
//             )}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OneCourse;
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCourseById,
  deleteCourse,
  updateCourse,
  deleteReview,
} from "../../api/api-client";
import style from "./CourseCard.module.scss";
import { useUser } from "../../contexts/userContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddReview from "../AddReview/AddReview.jsx";
import CourseCard from "./CourseCard.jsx";
import RatingStars from "../RatingStars/RatingStars";
import { useCart } from "../../contexts/сardContext.jsx";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaEdit,
  FaRegTrashAlt,
} from "react-icons/fa";

const OneCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const { user } = useUser();
  const { cart, addToCart } = useCart();
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    fetchCourse();
    checkPaymentStatus();
  }, []);

  const notifyError = (message) =>
    toast.error(message, { className: style.errorMessage });
  const notifySuccess = (message) =>
    toast.success(message, { className: style.successMessage });

  const fetchCourse = async () => {
    try {
      const { data } = await getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du cours:", error);
    }
  };

  const checkPaymentStatus = () => {
    const paidCourses = JSON.parse(localStorage.getItem("paidCourses")) || [];
    if (paidCourses.includes(id)) {
      setHasPaid(true);
    } else {
      setHasPaid(false); // Для непройденных оплат
    }
  };
  const addToCartHandler = () => {
    if (!user) {
      notifyError("Vous devez vous connecter pour ajouter un cours");
      return;
    }

    const isCourseInCart = cart.some((item) => item._id === course._id);
    if (isCourseInCart) {
      notifyError("Ce cours est déjà dans le panier");
    } else {
      addToCart(course);
      notifySuccess("Le cours a été ajouté au panier avec succès");
    }
  };

  const handleReviewAdded = (newReview) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      review: [...prevCourse.review, newReview],
    }));
  };

  const handleDeleteCourse = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours?")) {
      try {
        await deleteCourse(course._id);
        notifySuccess("Le cours a été supprimé avec succès");
        navigate("/courses"); // Redirige après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression du cours:", error);
        notifyError("Erreur lors de la suppression du cours");
      }
    }
  };

  const handleEditCourse = () => {
    navigate(`/update-course/${course._id}`, { state: course });
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet avis?")) {
      try {
        await deleteReview(reviewId);
        setCourse((prevCourse) => ({
          ...prevCourse,
          review: prevCourse.review.filter((review) => review._id !== reviewId),
        }));
        notifySuccess("L'avis a été supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'avis:", error);
        notifyError("Erreur lors de la suppression de l'avis");
      }
    }
  };

  const handleEditReview = (review) => {
    navigate(`/update-reviews/${review._id}`, { state: review });
  };

  if (!course) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <ToastContainer />
      <main className="container section">
        <div className={`${style.courseDetail} ${style.singleCard}`}>
          <div>
            <CourseCard
              id={course._id}
              name={course.name}
              content={course.content}
              category={course.category}
              picture={course.picture}
              price={course.price}
              showOverlay={false}
              isSingleCourse={true}
            />
            <button
              className={style.addToCartButton}
              onClick={addToCartHandler}
            >
              <FaShoppingCart />
            </button>
            {user && user.isAdmin && (
              <div className={style.adminActions}>
                <Link to="/add-course" className={style.addButton}>
                  <FaPlus /> Ajouter un cours
                </Link>
                <button onClick={handleEditCourse} className={style.editButton}>
                  <FaEdit /> Modifier
                </button>
                <button
                  onClick={handleDeleteCourse}
                  className={style.deleteButton}
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            )}
          </div>

          <div className={style.courseDetail__content}>
            {course.review.length > 0 && (
              <h3 className={style.card__review}>Avis</h3>
            )}
            <ul className={style.reviewList}>
              {course.review.map((review) => (
                <li className={style.card__item} key={review._id}>
                  <RatingStars rating={review.rating} />
                  {review.comment}
                  {user && user.isAdmin && (
                    <div className={style.reviewActions}>
                      <button
                        onClick={() => handleEditReview(review)}
                        className={style.editButton}
                      >
                        <FaEdit /> Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className={style.deleteButton}
                      >
                        <FaRegTrashAlt /> Supprimer
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {user && (
              <AddReview
                courseId={id}
                hasPaid={hasPaid} // передаем статус оплаты
                onReviewAdded={(newReview) =>
                  setCourse((prevCourse) => ({
                    ...prevCourse,
                    review: [...prevCourse.review, newReview],
                  }))
                }
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default OneCourse;


