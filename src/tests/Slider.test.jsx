import React from "react";
import { render, screen } from "@testing-library/react";
import Slide from "../components/Slider/Slider"; // путь к компоненту
import { expect, it } from "vitest";
import "@testing-library/jest-dom"; // для использования toHaveAttribute

// Мокаем компонент Slider
import Slider from "react-slick";
vi.mock("react-slick", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

it("renders the Slide component correctly", () => {
  render(<Slide />);

  // Проверяем, что слайды (изображения) присутствуют на странице
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(12); // Убедитесь, что все изображения загружены
  expect(images[0]).toHaveAttribute(
    "alt",
    "Cours de coloration des cheveux pour débutants"
  );
  expect(images[1]).toHaveAttribute(
    "alt",
    "Cours avancé de coloration des cheveux"
  );
});

it("should display a slider with correct number of slides", () => {
  render(<Slide />);

  // Проверяем, что компонент Slider рендерится с 12 слайдами
  const sliderItems = screen.getAllByRole("img");
  expect(sliderItems).toHaveLength(12);
});
