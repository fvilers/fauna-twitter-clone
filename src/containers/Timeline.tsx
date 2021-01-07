import React, { useContext } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import TweetList from "../components/TweetList";
import TimelineContext from "../contexts/TimelineContext";

function Timeline() {
  const { busy, errorMessage, tweets } = useContext(TimelineContext);

  if (busy) {
    return <Loading message="Loading timeline..." />;
  }

  if (errorMessage) {
    return <Message variant="error">{errorMessage}</Message>;
  }

  if (tweets.length === 0) {
    return (
      <Message>
        There's no tweet to display. You should start following some people.
      </Message>
    );
  }

  return <TweetList items={tweets} />;
}

export default Timeline;
