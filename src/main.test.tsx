import { describe, expect, it, vi } from "vitest";
import type { Root } from "react-dom/client";

vi.mock("./app", () => ({
  __esModule: true,
  default: () => <div>Hello, World!</div>,
}));

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn<(_container: HTMLElement) => Root>(() => ({
    render: vi.fn<() => void>(),
    unmount: vi.fn<() => void>(),
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
