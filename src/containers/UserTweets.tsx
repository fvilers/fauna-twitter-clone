import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import TweetList from "../components/TweetList";
import { getUserTweets } from "../db/Tweets";
import TweetModel from "../models/TweetModel";
import AsyncOperation from "../types/AsyncOperation";

type Props = {
  username: string;
};

type State = AsyncOperation & {
  tweets: TweetModel[];
};

function UserTweets({ username }: Props) {
  const [{ busy, errorMessage, tweets }, setState] = useState<State>({
    busy: false,
    tweets: [],
  });

  useEffect(() => {
    const loadData = async () => {
      setState((s) => ({ ...s, busy: true, errorMessage: undefined }));

      try {
        const tweets = await getUserTweets(username);
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
  }, [username]);

  if (busy) {
    return <Loading message="Loading tweets..." />;
  }

  if (errorMessage) {
    return <Message variant="error">{errorMessage}</Message>;
  }

  if (tweets.length === 0) {
    return <Message>This user has not yet started tweeting.</Message>;
  }

  return <TweetList items={tweets} />;
}

export default UserTweets;
