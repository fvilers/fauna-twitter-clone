import React from "react";
import "./TweetCounter.css";

type Props = {
  length: number;
  max: number;
};

function TweetCounter({ length, max }: Props) {
  return (
    <div className="TweetCounter">
      <meter
        min={0}
        low={max * 0.9}
        high={max - 1}
        max={max}
        value={length}
      ></meter>
      <small>
        {length}/{max}
      </small>
    </div>
  );
}

export default TweetCounter;
