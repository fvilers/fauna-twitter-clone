import React, { useContext } from "react";
import Nav from "../components/Nav";
import ComposeTweet from "../containers/ComposeTweet";
import Timeline from "../containers/Timeline";
import TimelineProvider from "../containers/TimelineProvider";
import AuthContext from "../contexts/AuthContext";

function HomePage() {
  const { secret } = useContext(AuthContext);

  return (
    <>
      <Nav />
      <main>
        {secret && (
          <TimelineProvider>
            <h2>Latest Tweets</h2>
            <Timeline />
            <ComposeTweet />
          </TimelineProvider>
        )}
      </main>
    </>
  );
}

export default HomePage;
