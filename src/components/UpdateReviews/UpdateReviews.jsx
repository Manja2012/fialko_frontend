// import { useState, useEffect } from "react";
// import {
//   getAllReviewsByOneCourse,
//   getAllReviews,
//   getAllReviewsById,
//   deleteReview,
//   updateReview,
// } from "../../api/api-client.js";

// import style from "../ContactsForm/ContactsForm.module.scss";

// const UpdateReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [currentId, setCurrentId] = useState();
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(0);
  

//   const fetchReview = async () => {
//     try {
//       const { data } = await getAllReviewsById();
//       setReviews(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     fetchReview();
//   }, []);

//   const handleSubmit = async (event, currentId) => {
//     event.preventDefault();

//     try {
//        setCurrentId(id);
       
//        setComment(comment);
//        setRating(rating);
   
//     } catch (e) {
//       console.log(e);
//     }
//   };
  

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label className={style.form__label}>Rating:</label>
//           <input
//             className={style.form__input}
//             type="number"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             min="1"
//             max="5"
//             required
//           />
//         </div>
//         <div>
//           <label className={style.form__label}>Comment:</label>
//           <textarea
//             className={style.form__comment}
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             required
//           />
//         </div>
//         <button className="button" type="submit">
//           Submit Review
//         </button>
//       </form>
//     </>
//   );
// };

// export default UpdateReviews;
