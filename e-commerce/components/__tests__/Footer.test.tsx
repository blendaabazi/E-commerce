import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

jest.mock("@/constants", () => ({
  quickLinksData: [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
  ],
  categoriesData: [
    { title: "Chairs", href: "/chairs" },
    { title: "Tables", href: "/tables" },
  ],
}));

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

 it("renders logo and description", () => {
  // Gjej heading-un e logos (Nova) që është i tipit <h2>
  expect(screen.getByRole("heading", { level: 2, name: /Nova/i })).toBeInTheDocument();

  // Kontrollo përshkrimin
  expect(
    screen.getByText(/Discover curated furniture collections at Nova/i)
  ).toBeInTheDocument();
});


  it("renders quick links correctly", () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Shop").closest("a")).toHaveAttribute("href", "/shop");
  });

  it("renders categories correctly", () => {
    expect(screen.getByText("Chairs")).toBeInTheDocument();
    expect(screen.getByText("Tables")).toBeInTheDocument();

    expect(screen.getByText("Chairs").closest("a")).toHaveAttribute("href", "/category/chairs");
    expect(screen.getByText("Tables").closest("a")).toHaveAttribute("href", "/category/tables");
  });

  it("renders newsletter form", () => {
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("renders copyright section", () => {
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${year} Nova. All rights reserved.`, "i"))).toBeInTheDocument();
  });
});
