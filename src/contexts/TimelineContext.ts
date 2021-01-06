import { createContext } from "react";
import TweetModel from "../models/TweetModel";

type ContextProps = {
  addTweet: (tweet: TweetModel) => void;
  tweets: TweetModel[];
};

const TimelineContext = createContext<ContextProps>({
  addTweet: () => {},
  tweets: [],
});

export default TimelineContext;
