import assert from "assert";
import React, { useContext, useRef, useState } from "react";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import TweetForm, {
  TweetFormHandles,
  TweetFormValues,
} from "../components/TweetForm";
import AuthContext from "../contexts/AuthContext";
import TimelineContext from "../contexts/TimelineContext";
import { composeTweet } from "../db/Tweets";
import AsyncOperation from "../types/AsyncOperation";

function ComposeTweet() {
  const [showDialog, setShowDialog] = useState(false);
  const [{ busy, errorMessage }, setOperation] = useState<AsyncOperation>({
    busy: false,
  });
  const { secret } = useContext(AuthContext);
  const { addTweet } = useContext(TimelineContext);
  const ref = useRef<TweetFormHandles>(null);
  const handleReset = () => {
    setShowDialog(false);
  };
  const handleSendTweet = async ({ tweet }: TweetFormValues) => {
    assert(secret);
    assert(ref.current);
    setOperation({ busy: true, errorMessage: undefined });

    try {
      const model = await composeTweet(tweet, secret);
      addTweet(model);
      ref.current.reset();
      setShowDialog(false);
      setOperation({ busy: false });
    } catch (error) {
      console.error(error);
      setOperation({
        busy: false,
        errorMessage: error.description || error.message,
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        position="fab"
        variant="primary"
      >
        Tweet
      </Button>
      <Dialog modal onClose={handleReset} open={showDialog}>
        <TweetForm
          disabled={busy}
          errorMessage={errorMessage}
          ref={ref}
          onReset={handleReset}
          onSubmit={handleSendTweet}
        />
      </Dialog>
    </>
  );
}

export default ComposeTweet;
