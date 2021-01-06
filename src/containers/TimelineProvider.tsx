import assert from "assert";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import TimelineContext from "../contexts/TimelineContext";
import { getTimeline } from "../db/Tweets";
import TweetModel from "../models/TweetModel";
import AsyncOperation from "../types/AsyncOperation";

type Props = {
  children: ReactNode;
};

type State = AsyncOperation & {
  tweets: TweetModel[];
};

function TimelineProvider({ children }: Props) {
  const [{ busy, errorMessage, tweets }, setState] = useState<State>({
    busy: false,
    tweets: [],
  });
  const addTweet = (tweet: TweetModel) => {
    setState((s) => ({ ...s, tweets: [tweet, ...s.tweets] }));
  };

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

  return (
    <TimelineContext.Provider value={{ addTweet, busy, errorMessage, tweets }}>
      {children}
    </TimelineContext.Provider>
  );
}

export default TimelineProvider;
