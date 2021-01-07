import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import UserTitle from "../components/UserTitle";
import CurrentUserProvider from "../containers/CurrentUserProvider";
import UserTweets from "../containers/UserTweets";

type Params = {
  username: string;
};

function UserPage() {
  const { username } = useParams<Params>();

  return (
    <>
      <Nav />
      <main>
        <CurrentUserProvider>
          <UserTitle username={username} />
        </CurrentUserProvider>
        <UserTweets username={username} />
      </main>
    </>
  );
}

export default UserPage;
