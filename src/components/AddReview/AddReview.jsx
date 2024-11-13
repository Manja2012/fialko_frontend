import { useState, useEffect } from "react";
import { addReview, getReviewsForCourse } from "../../api/api-client.js";
import { useUser } from "../../contexts/userContext.jsx";
import { ToastContainer, toast } from "react-toastify"; // Импортируем необходимые компоненты из react-toastify
import "react-toastify/dist/ReactToastify.css"; // Импортируем стили для Toastify
import style from "../ContactsForm/ContactsForm.module.scss";

const AddReview = ({ courseId, onReviewAdded }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    // Проверяем наличие записи в localStorage
    const reviewed = localStorage.getItem(`hasReviewed-${courseId}`);
    if (reviewed === "true") {
      setHasReviewed(true);
    } else {
      const checkUserReview = async () => {
        try {
          const reviews = await getReviewsForCourse(courseId);
          if (reviews && Array.isArray(reviews)) {
            const userReview = reviews.find(
              (review) => review.user === user._id
            );
            if (userReview) {
              setHasReviewed(true);
              localStorage.setItem(`hasReviewed-${courseId}`, "true");
            }
          }
        } catch (error) {
          console.error("Failed to check user review:", error);
          toast.error("Failed to fetch reviews. Please try again later.", {
            className: style.errorMessage,
          });
        }
      };

      checkUserReview();
    }
  }, [courseId, user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      toast.error("Veuillez entrer une note entre 1 et 5.", {
        className: style.errorMessage,
      });
      return;
    }

    try {
      await addReview({
        user: user._id,
        course: courseId,
        comment,
        rating: Number(rating),
      });

      toast.success("Review submitted successfully!", {
        className: style.successMessage,
      });
      onReviewAdded({ comment, rating: Number(rating), user: user._id });
      setRating("");
      setComment("");
      setHasReviewed(true);

      localStorage.setItem(`hasReviewed-${courseId}`, "true");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review", { className: style.errorMessage });
    }
  };

  return (
    <div>
      {hasReviewed ? (
        <p>Vous avez déjà laissé un avis pour ce cours.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={style.form__label}>Rating:</label>
            <input
              className={style.form__input}
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label className={style.form__label}>Comment:</label>
            <textarea
              className={style.form__comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">
            Submit Review
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddReview;
