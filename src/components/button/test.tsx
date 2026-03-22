import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "~/test-utils/render";
import { Button } from ".";
import buttonVariants from "./buttonVariants";

describe("component", () => {
  describe("Button", () => {
    it("should render correctly", () => {
      render(<Button>Hello, World!</Button>);

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render correctly, with render prop", () => {
      render(
        <a href="#" className={buttonVariants()}>
          Hello, World!
        </a>,
      );

      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });
});
