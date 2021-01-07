import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import UserTitle from "../components/UserTitle";
import UserTweets from "../containers/UserTweets";

type Params = {
  username: string;
};

function UserPage() {
  const { username } = useParams<Params>();

  return (
    <div>
      <Nav />
      <UserTitle username={username} />
      <UserTweets username={username} />
    </div>
  );
}

export default UserPage;
