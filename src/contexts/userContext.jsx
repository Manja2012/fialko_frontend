import { createContext, useState, useContext, useEffect } from "react";
import { logIn, register } from "../api/api-client";
import axios from "axios";
import { useCart } from "./сardContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { clearCart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/user/current/get",
          {
            withCredentials: true,
          }
        );
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("error", error);
      }
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const userData = await logIn(email, password);

    localStorage.clear();
    clearCart(); 

    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    clearCart(); 
  };

  const registerUser = async (userData) => {
    const newUser = await register(userData);
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
