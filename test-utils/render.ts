import { afterEach } from "vitest";
import type { ReactElement, ReactNode } from "react";
import { cleanup, render } from "@testing-library/react";
import type { Queries, RenderOptions } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options: RenderOptions<Queries> = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }): ReactNode => children,
    ...options,
  });

export { customRender as render };
