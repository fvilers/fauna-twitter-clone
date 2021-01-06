import React, { useContext } from "react";
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
