import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LoginForm } from "./LoginForm";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";
import esDict from "@/infrastructure/i18n/dictionaries/es.json";

vi.mock("@/presentation/components/Toaster/controller/toast.controller", () => ({
  successToast: vi.fn(),
  errorToast: vi.fn(),
}));

const defaultProps = {
  translations: { ...esDict.login, ...esDict.common },
  validationTranslations: esDict.validation,
  lang: "es" as const,
};

describe("LoginForm", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders all form elements correctly", () => {
    render(<LoginForm {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: new RegExp(esDict.login.title, "i") }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: new RegExp(esDict.login.submitButton, "i") }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(esDict.login.forgotPassword, "i") }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(esDict.login.noAccount, "i"))).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(esDict.login.register, "i") }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", {
      name: new RegExp(esDict.login.submitButton, "i"),
    });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(esDict.validation.emailRequired, "i")),
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(esDict.validation.passwordRequired, "i")),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", {
      name: new RegExp(esDict.login.submitButton, "i"),
    });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(esDict.validation.emailInvalid, "i")),
      ).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data and locale when form is valid and shows success toast", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm {...defaultProps} onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", {
      name: new RegExp(esDict.login.submitButton, "i"),
    });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "ValidPassword123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(
        { email: "test@example.com", password: "ValidPassword123" },
        "es",
      );
      expect(successToast).toHaveBeenCalledWith(
        esDict.login.successTitle,
        esDict.login.successMessage,
      );
      expect(errorToast).not.toHaveBeenCalled();
    });
  });

  it("shows error toast when onSubmit returns an error string in the result object", async () => {
    const errorMessage = "Credenciales incorrectas";
    const handleSubmit = vi.fn().mockResolvedValue({ error: errorMessage });
    render(<LoginForm {...defaultProps} onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", {
      name: new RegExp(esDict.login.submitButton, "i"),
    });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "WrongPassword123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(errorToast).toHaveBeenCalledWith(esDict.login.errorTitle, errorMessage);
      expect(successToast).not.toHaveBeenCalled();
    });
  });
});
