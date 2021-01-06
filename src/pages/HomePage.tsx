import React, { useContext } from "react";
import Greeting from "../components/Greeting";
import Nav from "../components/Nav";
import ComposeTweet from "../containers/ComposeTweet";
import Timeline from "../containers/Timeline";
import TimelineProvider from "../containers/TimelineProvider";
import AuthContext from "../contexts/AuthContext";

function HomePage() {
  const { hasSecret } = useContext(AuthContext);
  return (
    <div>
      <Nav />
      {hasSecret() && (
        <TimelineProvider>
          <section>
            <Greeting />
          </section>
          <section>
            <ComposeTweet />
          </section>
          <section>
            <h2>Latest Tweets</h2>
            <Timeline />
          </section>
        </TimelineProvider>
      )}
    </div>
  );
}

export default HomePage;
