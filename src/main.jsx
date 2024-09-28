import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./scss/base.scss";

import { UserProvider } from "./contexts/userContext.jsx";
//stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);



createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
