import React from "react";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (courseId) => {
    setCart((prevCart) => prevCart.filter((course) => course._id !== courseId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartCount = cart.length;
  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  const handleUserChange = (isLoggedIn, userId) => {
    if (!isLoggedIn) {
      clearCart();
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart && savedCart.some((item) => item.userId !== userId)) {
        clearCart();
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        total,
        handleUserChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
