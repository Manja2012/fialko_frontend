import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useUser } from "./contexts/userContext.jsx";
import Template from "./components/Template/Template.jsx";
import TemplateLogIn from "./components/TemplateLogIn/TemplateLogIn.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ContactsPage from "./pages/ContactsPage/ContactsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import CoursesPage from "./pages/CoursesPage/CoursesPage.jsx";
import OneCoursePage from "./pages/OneCoursePage/OneCoursePage.jsx";
import AboutMePage from "./pages/AboutMePage/AboutMePage.jsx";
import Success from "./stripe/success.jsx";
import PanierPage from "./pages/PanierPage/PanierPage.jsx";
import PaiementPage from "./pages/PaiementPage/PaiementPage.jsx";
import PhotosPage from "./pages/PhotosPage/PhotosPages.jsx";
import AddCourseForm from "./components/AddCourseForm/AddCourseForm.jsx";
import UpdateCourse from "./components/UpdateCourse/UpdateCourse.jsx";
import UpdateReviews from './components/UpdateReviews/UpdateReviews.jsx';
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm.jsx";
import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm.jsx";
import Modal from "./components/Modal/Modal.jsx"; 
import LegalNotice from "./pages/LegalNotice/LegalNotice.jsx";
import DataRegisterPage from "./pages/DataRegisterPage/DataRegisterPage.jsx";

function App() {
  const { user } = useUser();
  const [isOk, setOk] = useState(localStorage.getItem("isOk") === "true");

  return (
    <>
      {!isOk && (
        <Modal title="Cookies">
          <span className="mx-2">
            Notre site utilise des cookies, acceptez-vous ?
          </span>
          <button
            className="button_cookies"
            onClick={() => {
              localStorage.setItem("isOk", "true");
              setOk(true);
              notify();
            }}
          >
            Oui
          </button>
          <button
            className="button_cookies"
            onClick={() => {
              localStorage.setItem("isOk", "true");
              setOk(true);
              notify();
            }}
          >
            Paramètres les cookies
          </button>
        </Modal>
      )}
      <Routes>
        {user ? (
          <Route path="/" element={<TemplateLogIn />}>
            <Route index element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<OneCoursePage />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/propos" element={<AboutMePage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/panier" element={<PanierPage />} />
            <Route path="/paiement" element={<PaiementPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            {user.isAdmin && <Route path="/admin" element={<AdminPage />} />}
            <Route path="/add-course" element={<AddCourseForm />} />
            <Route path="/update-course/:id" element={<UpdateCourse />} />
            <Route path="/update-reviews/:id" element={<UpdateReviews />} />
            <Route path="/legalnotice" element={<LegalNotice />} />
            <Route path="/rgpd" element={<DataRegisterPage />} />
          </Route>
        ) : (
          <Route path="/" element={<Template />}>
            <Route index element={<HomePage />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<OneCoursePage />} />
            <Route path="/propos" element={<AboutMePage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/legalnotice" element={<LegalNotice />} />
            <Route path="/rgpd" element={<DataRegisterPage />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
