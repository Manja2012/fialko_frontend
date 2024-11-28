import { useState } from "react";
import { addCourse } from "../../api/api-client.js";
import style from "../ContactsForm/ContactsForm.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);
  const [isCourseAdded, setIsCourseAdded] = useState(false);

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    if (isCourseAdded) {
      toast.error("Ce cours a déjà été ajouté !");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await addCourse(formData);
      console.log(response);

    
      toast.success("Cours ajouté avec succès !");
      setIsCourseAdded(true);
     
     
      setName("");
      setCategory("");
      setContent("");
      setPrice("");
      setPicture(null);
    } catch (e) {
      console.log(e);
      toast.error("Une erreur s'est produite lors de l'ajout du cours.");
    }
  };

  const handleReset = () => {
    setIsCourseAdded(false);
  };

  return (
    <div className="container">
      <ToastContainer />
      <section className="section">
        <h1 className="title">Ajouter un cours</h1>
        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <label className={style.form__label}>
            Nom
            <input
              className={style.form__input}
              type="text"
              onChange={handleNameChange}
              value={name}
              name="name"
              onFocus={handleReset}
            />
          </label>
          <label className={style.form__label}>
            Catégorie
            <input
              className={style.form__input}
              type="text"
              onChange={handleCategoryChange}
              value={category}
              name="category"
              onFocus={handleReset}
            />
          </label>
          <label className={style.form__label}>
            Contenu
            <input
              className={style.form__input}
              type="text"
              onChange={handleContentChange}
              value={content}
              name="content"
              onFocus={handleReset} 
            />
          </label>
          <label className={style.form__label}>
            Prix
            <input
              className={style.form__input}
              type="text"
              onChange={handlePriceChange}
              value={price}
              name="price"
              onFocus={handleReset}
            />
          </label>
          <label className={style.form__label}>
            Image
            <input
              className={style.form__input}
              type="file"
              onChange={handlePictureChange}
              name="picture"
            />
          </label>
          <button className="button" type="submit">
            Ajouter un cours
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddCourseForm;
