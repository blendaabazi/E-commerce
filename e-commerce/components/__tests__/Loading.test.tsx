// __tests__/Loading.test.tsx
import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
  it("renders logo and loading text", () => {
    render(<Loading />);
    
    // Kontrollo nëse logoja (mund të jetë një element me role ose alt text në Logo)
    // Nëse Logo nuk ka alt text, thjesht kontrollojmë nëse komponenti ekziston.
    // Këtu po kontrollojmë për tekstin.
    const loadingText = screen.getByText(/Nova is loading.../i);
    expect(loadingText).toBeInTheDocument();

    // Mund të kontrollosh për ikonën e spinner-it duke përdorur klasin animate-spin
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
