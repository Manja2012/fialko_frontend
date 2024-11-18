// vitest.config.js
export default {
  test: {
    globals: true,
    environment: "jsdom",
    transform: {
      "^.+\\.(jsx|tsx)$": "babel-jest", // Для обработки JSX
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Добавьте это
  },
};
