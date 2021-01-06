import React from "react";
import "./Loading.css";

type Props = {
  message?: string;
};

function Loading({ message = "Loading..." }: Props) {
  return (
    <div className="Loading">
      <progress title={message} />
    </div>
  );
}

export default Loading;
