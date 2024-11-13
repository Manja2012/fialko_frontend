// // import { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // import CourseCard from "../../components/Course/CourseCard";

// // const Panier = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [total, setTotal] = useState(0);

// //   useEffect(() => {
// //     const cart = JSON.parse(localStorage.getItem("cart"));
// //     setCourses(cart ?? []);
// //     setTotal(cart?.reduce((acc, curr) => acc + curr.price, 0) ?? 0);
// //   }, []);

// //   //  const notify = () =>
// //   //    toast.error(`S'il vous plaît, remplissez le champ de texte`, {
// //   //      className: style.errorMessage,
// //   //    });

// //   const handleRemoveCourse = (courseId) => {
// //     const updatedCourses = courses.filter(
// //       (course, index) => index !== courseId
// //     );
// //     // console.log(updatedCourses);
// //     // Обновляем состояние courses
// //     setCourses(updatedCourses);
// //     // Пересчитываем общую стоимость
// //     setTotal(updatedCourses.reduce((acc, curr) => acc + curr.price, 0));
// //     // Сохраняем обновленный список курсов в localStorage
// //     localStorage.setItem("cart", JSON.stringify(updatedCourses));
// //   };

// //   return (
// //     <>
// //       <div className="container">
// //         <ul className="section">
// //           {courses.map((card, index) => (
// //             <li key={index}>
// //               <CourseCard
// //                 id={card.id}
// //                 name={card.name}
// //                 content={card.content}
// //                 category={card.category}
// //                 picture={card.picture}
// //                 price={card.price}
// //               />
// //               <button
// //                 className="button"
// //                 onClick={() => handleRemoveCourse(index)}
// //               >
// //                 Retirer du panier
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //         <p>Coût total : {total} €</p>
// //       </div>
// //       <Link className="link" to="/paiement">
// //         <button onClick={handleOrder}>
// //           Payer
// //         </button>
// //       </Link>
// //     </>
// //   );
// // };

// // export default Panier;

// import { useState, useEffect } from "react";
// import CourseCard from "../../components/Course/CourseCard";
// import { createOrder, checkPaymentStatus } from "../../api/api-client.js";

// const Panier = () => {
//   const [courses, setCourses] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart"));
//     setCourses(cart ?? []);
//     setTotal(cart?.reduce((acc, curr) => acc + curr.price, 0) ?? 0);
//   }, []);

//   const handleRemoveCourse = (courseId) => {
//     const updatedCourses = courses.filter(
//       (course, index) => index !== courseId
//     );
//     setCourses(updatedCourses);
//     setTotal(updatedCourses.reduce((acc, curr) => acc + curr.price, 0));
//     localStorage.setItem("cart", JSON.stringify(updatedCourses));
//   };

//   const handleOrder = async () => {
//     try {
//       if (courses.length === 0) {
//         alert("Votre panier est vide.");
//         return;
//       }

//       const panier = JSON.parse(localStorage.getItem("cart"));
//       const firstCourse = courses[0];
//       const { sessionId } = await createOrder(panier);

//       // window.location.href = `https://checkout.stripe.com/pay/${sessionId}`; // Commenté par Stan

//       // await handleCheckPayment(sessionId);

//       localStorage.removeItem("cart");
//       setCourses([]);
//       setTotal(0);
//     } catch (error) {
//       console.error("Error while creating order:", error);
//       alert("Erreur lors de la création de la commande");
//     }
//   };

//   const handleCheckPayment = async (sessionId) => {
//     try {
//       const paymentStatus = await checkPaymentStatus(sessionId); // Проверяем статус платежа
//       console.log("Payment status:", paymentStatus);
//     } catch (error) {
//       console.error("Failed to validate payment:", error);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <ul className="section">
//           {courses.map((card, index) => (
//             <li key={index}>
//               <CourseCard
//                 id={card.id}
//                 name={card.name}
//                 content={card.content}
//                 category={card.category}
//                 picture={card.picture}
//                 price={card.price}
//               />
//               <button
//                 className="button"
//                 onClick={() => handleRemoveCourse(index)}
//               >
//                 Retirer du panier
//               </button>
//             </li>
//           ))}
//         </ul>
//         <p>Coût total : {total} €</p>
//       </div>
//       <button onClick={handleOrder} className="button">
//         Payer
//       </button>
//     </>
//   );
// };

// export default Panier;
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/сardContext";
import CourseCard from "../../components/Course/CourseCard";
import style from "./PanierPage.module.scss"

const Panier = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <>
      <div className="container">
        {cart.length === 0 ? (
          <p className={style.cartCard__text}>
            La panier est actuellement vide.
          </p>
        ) : (
          <>
            <ul className="section">
              {cart.map((card) => (
                <li key={card._id} className={style.cartCard__item}>
                  <div>
                    {" "}
                    <CourseCard
                      id={card._id}
                      name={card.name}
                      content={card.content}
                      category={card.category}
                      picture={card.picture}
                      price={card.price}
                      isCartPage={true}
                    />
                  </div>
                  <div>
                    <button
                      className={style.cartCard__removeButton}
                      onClick={() => removeFromCart(card._id)}
                    >
                      Retirer du panier
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p>Coût total : {total} €</p>
            <Link className="link" to="/paiement">
              <button className="button">Payer</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Panier;

