import React, { useContext } from "react";
import Greeting from "../components/Greeting";
import Nav from "../components/Nav";
import ComposeTweet from "../containers/ComposeTweet";
import CurrentUserProvider from "../containers/CurrentUserProvider";
import Timeline from "../containers/Timeline";
import TimelineProvider from "../containers/TimelineProvider";
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
              <CurrentUserProvider>
                <Greeting />
              </CurrentUserProvider>
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
