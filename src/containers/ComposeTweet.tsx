import assert from "assert";
import React, { useContext, useRef, useState } from "react";
import TweetForm, {
  TweetFormHandles,
  TweetFormValues,
} from "../components/TweetForm";
import AuthContext from "../contexts/AuthContext";
import { composeTweet } from "../db/Tweets";
import AsyncOperation from "../types/AsyncOperation";

function ComposeTweet() {
  const [{ busy, errorMessage }, setOperation] = useState<AsyncOperation>({
    busy: false,
  });
  const { secret } = useContext(AuthContext);
  const ref = useRef<TweetFormHandles>(null);
  const handleSendTweet = async ({ tweet }: TweetFormValues) => {
    assert(secret);
    assert(ref.current);
    setOperation({ busy: true, errorMessage: undefined });

    try {
      const model = await composeTweet(tweet, secret);
      // TODO: add to the timeline
      console.log(model);
      ref.current.reset();
      setOperation({ busy: false });
    } catch (error) {
      console.log(error);
      setOperation({
        busy: false,
        errorMessage: error.description || error.message,
      });
    }
  };

  return (
    <TweetForm
      disabled={busy}
      errorMessage={errorMessage}
      ref={ref}
      onSubmit={handleSendTweet}
    />
  );
}

export default ComposeTweet;
