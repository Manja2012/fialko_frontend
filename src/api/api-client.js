import axios from "axios";
import config from "../config";
import { contactsRoute, coursesRoute, reviewsRoute } from "./routes";

axios.defaults.withCredentials = true;
axios.defaults.credentials = "include";

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
});

export default apiClient;

export const sendMessage = (contact) => {
  console.log(contact);
  apiClient.post(`${contactsRoute}add`, contact);
};

export const logIn = async (email, password) => {
  const user = await apiClient.post("/user/log-in", {
    email,
    password,
  });
  return user.data;
};

export const register = (user) => apiClient.post("/user/add", user);

export const getCourses = () => apiClient.get(coursesRoute);
export const getCourseById = (id) => apiClient.get(`${coursesRoute}${id}`);

export const addCourse = (course) => apiClient.post(`${coursesRoute}`, course);

export const deleteCourse = async (id) => {
  const response = await apiClient.delete(`${coursesRoute}${id}`);
  return response.data;
};

export const updateCourse = async (course, id) => {
  const response = await apiClient.put(`${coursesRoute}${id}`, course);
  return response.data;
};

export const addReview = async (review) => {
  console.log(review);
  const res = await apiClient.post(`${reviewsRoute}/${review.course}`, review);
  return res;
};

export const getReviewsForCourse = async (courseId) => {
  const response = await apiClient.get(`/review/course/${courseId}`);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await apiClient.delete(`/review/${reviewId}`);
  return response.data;
};

export const updateReview = async (id, review) => {
  const response = await apiClient.put(`/review/${id}`, review);
  return response.data;
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post("/auth/request-password-reset", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error requesting password reset:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response?.data || error.message
    );
    throw error;
  }
};

