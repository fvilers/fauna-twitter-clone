import React from "react";
import TweetModel from "../models/TweetModel";
import FromNow from "./FromNow";
import "./TweetList.css";

type Props = {
  items: TweetModel[];
};

function TweetList({ items }: Props) {
  return (
    <ul className="TweetList">
      {items.map(({ author, createdAt, id, tweet }) => (
        <li key={id}>
          <div>
            <small>
              @{author} &bull; <FromNow date={+createdAt} />
            </small>
          </div>
          <div>{tweet}</div>
        </li>
      ))}
    </ul>
  );
}

export default TweetList;
