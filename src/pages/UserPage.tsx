import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import UserTweets from "../containers/UserTweets";

type Params = {
  username: string;
};

function UserPage() {
  const { username } = useParams<Params>();

  return (
    <div>
      <Nav />
      <h2>@{username}</h2>
      <UserTweets username={username} />
    </div>
  );
}

export default UserPage;
