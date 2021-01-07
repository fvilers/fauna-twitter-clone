import React, { useContext } from "react";
import Nav from "../components/Nav";
import ComposeTweet from "../containers/ComposeTweet";
import Timeline from "../containers/Timeline";
import TimelineProvider from "../containers/TimelineProvider";
import WelcomeMessage from "../containers/WelcomeMessage";
import AuthContext from "../contexts/AuthContext";

function HomePage() {
  const { hasSecret } = useContext(AuthContext);

  return (
    <>
      <Nav />
      <main>
        {hasSecret() && (
          <TimelineProvider>
            <section>
              <WelcomeMessage />
            </section>
            <section>
              <h2>Latest Tweets</h2>
              <Timeline />
            </section>
            <ComposeTweet />
          </TimelineProvider>
        )}
      </main>
    </>
  );
}

export default HomePage;
