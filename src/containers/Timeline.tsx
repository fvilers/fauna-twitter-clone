import assert from "assert";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import TweetList from "../components/TweetList";
import AuthContext from "../contexts/AuthContext";
import { getTimeline } from "../db/Tweets";
import TweetModel from "../models/TweetModel";
import AsyncOperation from "../types/AsyncOperation";

type State = AsyncOperation & {
  tweets: TweetModel[];
};

function Timeline() {
  const [{ busy, errorMessage, tweets }, setState] = useState<State>({
    busy: false,
    tweets: [],
  });
  const { secret } = useContext(AuthContext);

  useEffect(() => {
    assert(secret);

    const loadData = async () => {
      setState((s) => ({ ...s, busy: true, errorMessage: undefined }));

      try {
        const tweets = await getTimeline(secret);
        setState({ busy: false, tweets });
      } catch (error) {
        console.error(error);
        setState((s) => ({
          ...s,
          busy: false,
          errorMessage: error.description || error.message,
        }));
      }
    };

    loadData();
  }, [secret]);

  if (busy) {
    return <Loading message="Loading timeline..." />;
  }

  if (errorMessage) {
    return <Message variant="error">{errorMessage}</Message>;
  }

  return <TweetList items={tweets} />;
}

export default Timeline;
