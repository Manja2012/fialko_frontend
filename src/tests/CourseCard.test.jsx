import React from "react";
import { render, screen } from "@testing-library/react";
import CourseCard from "../components/Course/CourseCard";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest"; // импорт из Vitest

describe("CourseCard", () => {
  const course = {
    _id: "1",
    name: "Test Course",
    content: "This is a test course",
    category: "Category 1",
    picture: "course.jpg",
    price: "30",
  };

  it("should render course name, content, category, and price", () => {
    render(
      <MemoryRouter>
        <CourseCard
          id={course._id}
          name={course.name}
          content={course.content}
          category={course.category}
          picture={course.picture}
          price={course.price}
          showOverlay={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(course.name)).toBeInTheDocument();
    expect(screen.getByText(course.content)).toBeInTheDocument();
    expect(
      screen.getByText(`Category: ${course.category}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Price: ${course.price}$`)).toBeInTheDocument();
  });

  it("should display overlay text when showOverlay is true", () => {
    render(
      <MemoryRouter>
        <CourseCard
          id={course._id}
          name={course.name}
          content={course.content}
          category={course.category}
          picture={course.picture}
          price={course.price}
          showOverlay={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(course.content)).toBeInTheDocument(); // Проверка overlay
  });

  it("should not display overlay text when showOverlay is false", () => {
    render(
      <MemoryRouter>
        <CourseCard
          id={course._id}
          name={course.name}
          content={course.content}
          category={course.category}
          picture={course.picture}
          price={course.price}
          showOverlay={false}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText(course.content)).toBeNull(); // Overlay не должен отображаться
  });
});
