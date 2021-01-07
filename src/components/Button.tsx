import clsx from "clsx";
import React, { MouseEventHandler, ReactNode } from "react";
import Variants from "../types/Variants";
import "./Button.css";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  position?: "fab";
  type?: "submit" | "reset" | "button";
  variant?: Variants | "fab" | "link";
};

function Button({
  children,
  disabled,
  onClick,
  position,
  type,
  variant,
}: Props) {
  const classes = clsx("Button", position, variant);

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
