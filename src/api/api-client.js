// import axios from "axios";
// import config from "../config";
// import { contactsRoute, coursesRoute, reviewsRoute } from "./routes";

// axios.defaults.withCredentials = true;

// const apiClient = axios.create({
//   baseURL: config.apiBaseUrl,
// });

// export default apiClient;

// export const sendMessage = (contact) => {
//   console.log(contact);
//   apiClient.post(`${contactsRoute}add`, contact);
// };

// export const logIn = async (email, password) => {
//   const user = await apiClient.post("/user/log-in", {
//     email,
//     password,
//   });
//   return user.data;
// };

// export const register = (user) => apiClient.post("/user/add", user);

// export const getCourses = () => apiClient.get(coursesRoute);
// export const getCourseById = (id) => apiClient.get(`${coursesRoute}${id}`);

// export const addCourse = (course) =>
//   apiClient.post(`${coursesRoute}`, course);

// export const deleteCourse = async (id) => {
//   const response = await apiClient.delete(`${coursesRoute}${id}`);
//   return response.data;
// };

// export const updateCourse = async (course, id) => {
//   const response = await apiClient.put(`${coursesRoute}${id}`, course);
//   return response.data;
// };

// export const addReview = async (review) => {
//   console.log(review);
//   const res = await apiClient.post(`${reviewsRoute}/${review.course}`, review);
//   return res;
// };

// export const getReviewsForCourse = async (courseId) => {
//   const response = await apiClient.get(`/review/course/${courseId}`);
//   return response.data;
// };

// // export const checkReservation = async (courseId) => {
// //   const { data } = await apiClient.get(`/reservation/check/${courseId}`);
// //   return data.hasReserved;
// // };

// // export const getAllReservationByUser = async () => {
// //   const reservations = await apiClient.get("/reservation/my/reservation");
// //   return reservations.data;
// // };

// export const deleteReview = async (reviewId) => {
//   const response = await apiClient.delete(`/review/${reviewId}`);
//   return response.data;
// };

// export const updateReview = async (id, review) => {
//   const response = await apiClient.put(`/review/${id}`, review);
//   return response.data;
// };

// // Запрос для отправки email для восстановления пароля
// export const requestPasswordReset = async (email) => {
//   try {
//     const response = await apiClient.post("/auth/request-password-reset", { email });
//     return response.data;
//   } catch (error) {
//     console.error("Error requesting password reset:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Запрос для сброса пароля
// export const resetPassword = async (token, newPassword) => {
//   try {
//     const response = await apiClient.post("/auth/reset-password", {
//       token,
//       newPassword,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error resetting password:", error.response?.data || error.message);
//     throw error;
//   }
// };


// // export const getOrder = async (orderId) => {
// //   const res = await apiClient.get(`/order/${orderId}`);
// //   return res.data;
// // };

// // export const createOrder = async (basket) => {
// //   const res = await apiClient.post("/order", { basket });
// //   return res.data;
// // };

// // export const checkPaymentStatus = async (sessionId) => {
// //   try {
// //     const response = await apiClient.put(`/order/payment-date`, { sessionId });
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error checking payment status:", error);
// //     throw error;
// //   }
// // };
import axios from "axios";
import config from "../config";
import { contactsRoute, coursesRoute, reviewsRoute } from "./routes";

// Получение CSRF-токена из мета-тега
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute("content");

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "csrf-token": csrfToken || "", // Добавление CSRF-токена в заголовок
  },
});

export default apiClient;

// Запросы, где CSRF-токен необходим (POST, PUT, DELETE)

export const sendMessage = (contact) => {
  console.log(contact);
  return apiClient.post(`${contactsRoute}add`, contact); // POST-запрос
};

export const logIn = async (email, password) => {
  const user = await apiClient.post("/user/log-in", {
    email,
    password,
  }); // POST-запрос
  return user.data;
};

export const register = (user) => apiClient.post("/user/add", user); // POST-запрос

export const addCourse = (course) => apiClient.post(`${coursesRoute}`, course); // POST-запрос

export const deleteCourse = async (id) => {
  const response = await apiClient.delete(`${coursesRoute}${id}`); // DELETE-запрос
  return response.data;
};

export const updateCourse = async (course, id) => {
  const response = await apiClient.put(`${coursesRoute}${id}`, course); // PUT-запрос
  return response.data;
};

export const addReview = async (review) => {
  console.log(review);
  const res = await apiClient.post(`${reviewsRoute}/${review.course}`, review); // POST-запрос
  return res;
};

export const deleteReview = async (reviewId) => {
  const response = await apiClient.delete(`/review/${reviewId}`); // DELETE-запрос
  return response.data;
};

export const updateReview = async (id, review) => {
  const response = await apiClient.put(`/review/${id}`, review); // PUT-запрос
  return response.data;
};

// Запрос для отправки email для восстановления пароля
export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post("/auth/request-password-reset", { email }); // POST-запрос
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error.response?.data || error.message);
    throw error;
  }
};

// Запрос для сброса пароля
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    }); // POST-запрос
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error.response?.data || error.message);
    throw error;
  }
};

// Оставляем запросы GET без изменений (CSRF-токен не нужен)

export const getCourses = () => apiClient.get(coursesRoute); // GET-запрос

export const getCourseById = (id) => apiClient.get(`${coursesRoute}${id}`); // GET-запрос

export const getReviewsForCourse = async (courseId) => {
  const response = await apiClient.get(`/review/course/${courseId}`); // GET-запрос
  return response.data;
};

// Комментируемые запросы:
export const getOrder = async (orderId) => {
  const res = await apiClient.get(`/order/${orderId}`); // GET-запрос
  return res.data;
};

export const createOrder = async (basket) => {
  const res = await apiClient.post("/order", { basket }); // POST-запрос
  return res.data;
};

export const checkPaymentStatus = async (sessionId) => {
  try {
    const response = await apiClient.put(`/order/payment-date`, { sessionId }); // PUT-запрос
    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};
