import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ReactNode } from "react";

const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  return {
    ...render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>),
  };
};

export default renderWithRouter;