import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactsForm from "../components/ContactsForm/ContactsForm";
import { sendMessage } from "../api/api-client";
import { vi } from "vitest";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";

vi.mock("../api/api-client", () => ({
  sendMessage: vi.fn(),
}));

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");
  return {
    ...actual,
    toast: {
      error: vi.fn(),
      success: vi.fn(),
    },
  };
});

describe("ContactsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls sendMessage with correct data and shows success toast", async () => {
    render(<ContactsForm />);

    fireEvent.change(screen.getByLabelText(/Nom complet\*/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email\*/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Numéro de téléphone\*/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Message\*/i), {
      target: { value: "Hello, this is a test message." },
    });

    fireEvent.click(screen.getByText(/Ok/i));

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        message: "Hello, this is a test message.",
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Votre message a été envoyé avec succès",
        expect.any(Object)
      );
    });
  });
});
