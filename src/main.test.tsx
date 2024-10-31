import { describe, expect, it, vi } from "vitest";

vi.mock("./App", () => ({
  __esModule: true,
  default: () => <div>Hello, World!</div>,
}));

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe("react tree root, main", () => {
  it("calls document.getElementById once", async () => {
    const spy = vi.spyOn(document, "getElementById");

    await import("./main");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("root");
  });
});
