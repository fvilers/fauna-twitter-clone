import clsx from "clsx";
import React, { MouseEventHandler, ReactNode } from "react";
import Variants from "../types/Variants";
import "./Button.css";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button";
  variant?: Variants | "link";
};

function Button({ children, disabled, onClick, type, variant }: Props) {
  const classes = clsx("Button", variant);

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
