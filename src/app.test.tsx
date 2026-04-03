import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import App from "./app";

vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn<() => void>(), // Deprecated
  removeListener: vi.fn<() => void>(), // Deprecated
  addEventListener: vi.fn<() => void>(),
  removeEventListener: vi.fn<() => void>(),
  dispatchEvent: vi.fn<() => void>(),
}));

describe("component", () => {
  describe("App", () => {
    it("should render correctly", () => {
      const { container } = render(<App />);

      expect(container.firstChild).toBeTruthy();
    });
  });
});
