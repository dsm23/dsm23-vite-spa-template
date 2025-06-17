// double space contracted  issue occurs on seed 1413643214

import { afterEach, describe, expect } from "vitest";
import crypto from "node:crypto";
import { fc, it } from "@fast-check/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Button } from ".";

const removeDoubleSpaces = (str: string) => str.replace(/\s+/g, " ");

describe("component", () => {
  describe("Button", () => {
    afterEach(() => {
      cleanup();
    });

    it("should render correctly with various children", () => {
      fc.assert(
        fc.property(fc.string(), (testValue) => {
          const id = crypto.randomUUID();

          const buttonText = removeDoubleSpaces(testValue);

          render(<Button data-testid={id}>{buttonText}</Button>);

          expect(screen.getByTestId(id)).toBeInTheDocument();
          expect(screen.getByTestId(id)).toHaveTextContent(buttonText.trim());
        }),
      );
    });

    it("should render correctly, asChild, with various children", () => {
      fc.assert(
        fc.property(fc.string(), fc.webUrl(), (testValue, href) => {
          const id = crypto.randomUUID();

          const linkText = removeDoubleSpaces(testValue);

          render(
            <Button asChild>
              <a href={href} data-testid={id}>
                {linkText.normalize()}
              </a>
            </Button>,
          );

          expect(screen.getByTestId(id)).toBeInTheDocument();
          expect(screen.getByTestId(id)).toHaveTextContent(linkText.trim());
          expect(screen.getByTestId(id)).toHaveAttribute("href", href.trim());
        }),
      );
    });

    it("should handle various className values", () => {
      fc.assert(
        fc.property(fc.string(), (testValue) => {
          const id = crypto.randomUUID();

          const className = removeDoubleSpaces(testValue);

          render(
            <Button className={className} data-testid={id}>
              Test
            </Button>,
          );

          expect(screen.getByTestId(id)).toBeInTheDocument();

          // otherwise, default className is applied, outside the scope of fuzzing
          if (className.trim() !== "") {
            expect(screen.getByTestId(id)).toHaveClass(className);
          }
        }),
      );
    });

    it("should handle various button types", () => {
      fc.assert(
        fc.property(fc.constantFrom("submit", "button", "reset"), (type) => {
          const id = crypto.randomUUID();

          render(
            <Button type={type} data-testid={id}>
              Test
            </Button>,
          );

          expect(screen.getByTestId(id)).toHaveAttribute("type", type);
        }),
      );
    });
  });
});
