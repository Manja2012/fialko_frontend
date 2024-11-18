import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../contexts/сardContext"; // замените на ваш путь
import OneCourse from "../components/Course/OneCourse"; // замените на ваш путь
import Panier from "../pages/PanierPage/PanierPage";
import { ToastContainer } from "react-toastify"; // добавим для проверки уведомлений

describe("OneCourse Component", () => {
  it("should add course to cart when 'Ajouter au panier' button is clicked", async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={["/course/1"]}>
          <OneCourse />
          <ToastContainer /> {/* Убедитесь, что уведомления отображаются */}
        </MemoryRouter>
      </CartProvider>
    );

    // Ожидаем появления кнопки с иконкой корзины
    const addToCartButton = await screen.findByRole("button", {
      name: /Ajouter au panier/i, // кнопка с иконкой корзины
    });

    // Симулируем клик по кнопке "Добавить в корзину"
    fireEvent.click(addToCartButton);

    // Проверка на появление уведомления об успешном добавлении товара в корзину
    await waitFor(() => {
      expect(
        screen.getByText(/Le cours a été ajouté au panier avec succès/i)
      ).toBeInTheDocument();
    });

    // Проверка, что курс добавлен в корзину
    const cartItemsCount = screen.getByText(/1 article/i); // Пример: проверка количества товаров в корзине
    expect(cartItemsCount).toBeInTheDocument();
  });

  it("should navigate to paiement page when 'Payer' button is clicked", async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={["/panier"]}>
          <Panier />
        </MemoryRouter>
      </CartProvider>
    );

    const payButton = await screen.findByRole("button", { name: /Payer/i });
    fireEvent.click(payButton);

    await waitFor(() => expect(window.location.pathname).toBe("/paiement"));
  });
});
