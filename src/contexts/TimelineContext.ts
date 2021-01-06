import { createContext } from "react";
import TweetModel from "../models/TweetModel";
import AsyncOperation from "../types/AsyncOperation";

type ContextProps = AsyncOperation & {
  addTweet: (tweet: TweetModel) => void;
  tweets: TweetModel[];
};

const TimelineContext = createContext<ContextProps>({
  addTweet: () => {},
  busy: false,
  tweets: [],
});

export default TimelineContext;
