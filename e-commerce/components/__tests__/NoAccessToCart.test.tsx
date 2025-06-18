// __tests__/NoAccessToCart.test.tsx

import { render, screen } from "@testing-library/react";
import NoAccessToCart from "@/components/NoAccessToCart";
import "@testing-library/jest-dom";

// Mocko Logo dhe butonat e Clerk nëse s'janë test-friendly
jest.mock("@clerk/nextjs", () => ({
  SignInButton: ({ children }: any) => <div data-testid="sign-in">{children}</div>,
  SignUpButton: ({ children }: any) => <div data-testid="sign-up">{children}</div>,
}));

jest.mock("@/components/Logo", () => () => <div data-testid="logo" />);

describe("NoAccessToCart", () => {
  it("renders logo, title and message", () => {
    render(<NoAccessToCart />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(
      screen.getByText(/Log in to view your cart items/i)
    ).toBeInTheDocument();
  });

  it("shows Sign In and Sign Up buttons", () => {
    render(<NoAccessToCart />);

    expect(screen.getByTestId("sign-in")).toBeInTheDocument();
    expect(screen.getByTestId("sign-up")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });
});
