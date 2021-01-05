import clsx from "clsx";
import React, { ReactNode } from "react";
import Variants from "../types/Variants";
import "./Message.css";

type Props = {
  children: ReactNode;
  variant?: Variants;
};

function Message({ children, variant }: Props) {
  const classes = clsx("Message", variant);

  return <div className={classes}>{children}</div>;
}

export default Message;
