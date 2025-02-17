import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Options } from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from ".";
import { render } from "../../../test-utils";

const setup = (jsx: ReactElement, opts?: Options) => ({
  user: userEvent.setup(opts),
  // Import `render` from the framework library of your choice.
  // See https://testing-library.com/docs/dom-testing-library/install#wrappers
  ...render(jsx),
});

describe("DropdownMenu components", () => {
  it("renders DropdownMenuTrigger and opens menu on click", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("Options")).toBeInTheDocument();

    await user.click(screen.getByText("Options"));

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders DropdownMenuCheckboxItem with checked state", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Options"));

    const checkboxItem = screen.getByText("Checkbox Item");
    expect(checkboxItem).toBeInTheDocument();
    expect(checkboxItem).toHaveAttribute("aria-checked", "true");
  });

  it("renders DropdownMenuRadioItem with selected state", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="itemOne">
            <DropdownMenuRadioItem value="itemOne">
              Radio Item
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Options"));

    const radioItem = screen.getByText("Radio Item");
    expect(radioItem).toBeInTheDocument();
    expect(radioItem).toHaveAttribute("aria-checked", "true");
  });

  it("renders DropdownMenuLabel and separator", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Options"));

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders DropdownMenuShortcut", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item 1 <DropdownMenuShortcut>⌘+K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Options"));

    expect(screen.getByText("⌘+K")).toBeInTheDocument();
  });

  it("renders DropdownMenuGroup with items", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Grouped Item 1</DropdownMenuItem>
            <DropdownMenuItem>Grouped Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Options"));

    expect(screen.getByText("Grouped Item 1")).toBeInTheDocument();
    expect(screen.getByText("Grouped Item 2")).toBeInTheDocument();
  });

  it("renders DropdownMenuSub with content", async () => {
    const { user } = setup(
      <DropdownMenu>
        <DropdownMenuTrigger>Options</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Second trigger</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Item One</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Item Two</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Options"));

    expect(screen.queryByText("Item One")).not.toBeInTheDocument();
    expect(screen.queryByText("Item Two")).not.toBeInTheDocument();

    await user.click(screen.getByText("Second trigger"));

    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();

    // move cursor away from SubTrigger
    await user.click(screen.getByText("My Account"));

    expect(screen.queryByText("Item One")).not.toBeInTheDocument();
    expect(screen.queryByText("Item Two")).not.toBeInTheDocument();
  });
});
