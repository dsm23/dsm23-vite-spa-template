import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from ".";
import { render } from "../../../test-utils";

vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // Deprecated
  removeListener: vi.fn(), // Deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

const MockComponent = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (newTheme: typeof theme) => () => {
    setTheme(newTheme);
  };

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="dark-button" onClick={toggleTheme("dark")}>
        Set Dark Mode
      </button>
      <button data-testid="light-button" onClick={toggleTheme("light")}>
        Set Light Mode
      </button>
      <button data-testid="system-button" onClick={toggleTheme("system")}>
        Set System
      </button>
    </div>
  );
};

const renderComponent = () => {
  render(
    <ThemeProvider>
      <MockComponent />
    </ThemeProvider>,
  );
};

describe("ThemeProvider", () => {
  it("should provide the default theme", () => {
    renderComponent();

    const theme = screen.getByTestId("theme");

    expect(theme).toHaveTextContent("system");
    expect(document.documentElement).toHaveClass("light");
  });

  it("should toggle the theme between light and dark", async () => {
    renderComponent();

    const theme = screen.getByTestId("theme");
    const darkButton = screen.getByTestId("dark-button");
    const lightButton = screen.getByTestId("light-button");
    const systemButton = screen.getByTestId("system-button");

    expect(theme).toHaveTextContent("system");

    await userEvent.click(darkButton);
    expect(theme).toHaveTextContent("dark");

    await userEvent.click(lightButton);
    expect(theme).toHaveTextContent("light");

    await userEvent.click(systemButton);
    expect(theme).toHaveTextContent("system");
  });

  it("system prefers dark", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
    }));

    renderComponent();

    expect(document.documentElement).toHaveClass("dark");
  });
});
