import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateReview } from "../../api/api-client.js";
import style from "../ContactsForm/ContactsForm.module.scss";

const UpdateReview = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { comment, rating } = state || {};
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState(comment || "");
  const [newRating, setNewRating] = useState(rating || 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateReview(id, { comment: newComment, rating: newRating });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="title">Modifier l'avis</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className={style.form__label}>Rating:</label>
            <input
              className={style.form__input}
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label className={style.form__label}>Comment:</label>
            <textarea
              className={style.form__comment}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          <button className={style.form__button} type="submit">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateReview;
