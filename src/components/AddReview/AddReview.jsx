import { useState, useEffect } from "react";
import { addReview, getReviewsForCourse } from "../../api/api-client.js";
import { useUser } from "../../contexts/userContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../ContactsForm/ContactsForm.module.scss";

const AddReview = ({ courseId, onReviewAdded, hasPaid }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const checkUserReview = async () => {
      try {
        const reviews = await getReviewsForCourse(courseId);
        if (reviews && Array.isArray(reviews)) {
          const userReview = reviews.find((review) => review.user === user._id);
          if (userReview) {
            setHasReviewed(true);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
        // toast.error("Impossible de récupérer les avis");
      }
    };

    checkUserReview();
  }, [courseId, user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasPaid) {
      toast.error("Vous devez d'abord payer le cours pour laisser un avis.");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Veuillez sélectionner une note entre 1 et 5.")
      return;
    }

    try {
      await addReview({
        user: user._id,
        course: courseId,
        comment,
        rating: Number(rating),
      });

      // toast.success("Avis ajouté avec succès!")
      onReviewAdded({ comment, rating: Number(rating), user: user._id });
      setRating("");
      setComment("");
      setHasReviewed(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);
      toast.error("Impossible d'envoyer l'avis")
    }
  };

  return (
    <div>
      {hasPaid && !hasReviewed ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={style.form__label}>Note:</label>
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
            <label className={style.form__label}>Commentaire:</label>
            <textarea
              className={style.form__comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button className={style.form__button} type="submit">
            Laisser un avis
          </button>
        </form>
      ) : (
        <p>
          {hasReviewed
            ? "Vous avez déjà laissé un avis"
            : "Payez le cours pour laisser un avis"}
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddReview;
