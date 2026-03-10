"use client";

import { isValidElement } from "react";
import type { FunctionComponent } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/utils/class-names";
import { isFunction } from "~/utils/is-type";
import buttonVariants from "./buttonVariants";

const Button: FunctionComponent<
  ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
> = ({
  className,
  render,
  variant = "default",
  size = "default",
  ...props
}) => {
  const isAnchor =
    isValidElement(render) && render.type === "a" && !isFunction(render);

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      role={isAnchor ? "link" : "button"}
      {...props}
    />
  );
};

export default Button;
