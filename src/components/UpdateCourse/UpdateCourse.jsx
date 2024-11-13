import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourse } from "../../api/api-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../ContactsForm/ContactsForm.module.scss";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: "",
    content: "",
    category: "",
    price: "",
    picture: null,
  });

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const { data } = await getCourseById(id);
      setCourseData({
        name: data.name,
        content: data.content,
        category: data.category,
        price: data.price,
      });
    } catch (error) {
      toast.error("Erreur lors de la récupération du cours", {
        className: style.errorMessage,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCourseData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", courseData.name);
    formData.append("content", courseData.content);
    formData.append("category", courseData.category);
    formData.append("price", courseData.price);
    if (courseData.picture) formData.append("picture", courseData.picture);

    try {
      await updateCourse(formData, id);
      toast.success("Le cours a été mis à jour avec succès !", {
        className: style.successMessage,
      });
      navigate(`/courses/${id}`);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du cours", {
        className: style.errorMessage,
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Modifier le cours</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className={style.form__label} htmlFor="name">
          Nom du cours:
        </label>
        <input
          type="text"
          name="name"
          value={courseData.name}
          onChange={handleChange}
          className={style.form__input}
        />

        <label className={style.form__label} htmlFor="content">
          Contenu:
        </label>
        <textarea
          name="content"
          value={courseData.content}
          onChange={handleChange}
          className={style.form__comment}
        />

        <label className={style.form__label} htmlFor="category">
          Catégorie:
        </label>
        <input
          type="text"
          name="category"
          value={courseData.category}
          onChange={handleChange}
          className={style.form__input}
        />

        <label className={style.form__label} htmlFor="price">
          Prix:
        </label>
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          className={style.form__input}
        />

        <label className={style.form__label} htmlFor="picture">
          Image:
        </label>
        <input
          type="file"
          name="picture"
          onChange={handleFileChange}
          className={style.form__input}
        />

        <button type="submit" className={style.form__button}>
          Mettre à jour le cours
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
