import React, { useContext } from "react";
import FollowUser from "../containers/FollowUser";
import AuthContext from "../contexts/AuthContext";
import "./UserTitle.css";

type Props = {
  username: string;
};

function UserTitle({ username }: Props) {
  const { hasSecret } = useContext(AuthContext);

  return (
    <div className="UserTitle">
      <h2>@{username}</h2>
      {hasSecret() && <FollowUser username={username} />}
    </div>
  );
}

export default UserTitle;
