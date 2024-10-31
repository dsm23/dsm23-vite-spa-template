import type { ReactElement } from "react";
import { afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { Queries, RenderOptions } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options: RenderOptions<Queries> = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export { customRender as render };
