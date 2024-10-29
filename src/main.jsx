// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./scss/base.scss";
import { UserProvider } from "./contexts/userContext.jsx";
import { CartProvider } from "./contexts/сardContext.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
