import React from "react";
import TweetForm from "../components/TweetForm";

function ComposeTweet() {
  // TODO: handle send tweet
  const handleSendTweet = () => {};

  return <TweetForm onSubmit={handleSendTweet} />;
}

export default ComposeTweet;
