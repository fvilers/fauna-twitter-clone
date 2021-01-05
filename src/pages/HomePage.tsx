import React, { useContext } from "react";
import Nav from "../components/Nav";
import ComposeTweet from "../containers/ComposeTweet";
import AuthContext from "../contexts/AuthContext";

function HomePage() {
  const { hasSecret } = useContext(AuthContext);
  return (
    <div>
      <h1>Twitter clone</h1>
      <Nav />
      {hasSecret() && <ComposeTweet />}
    </div>
  );
}

export default HomePage;
