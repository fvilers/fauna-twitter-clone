import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";

type Params = {
  username: string;
};

function UserPage() {
  const { username } = useParams<Params>();

  return (
    <div>
      <Nav />
      <h2>@{username}</h2>
    </div>
  );
}

export default UserPage;
