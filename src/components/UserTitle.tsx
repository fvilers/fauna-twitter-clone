import React, { useContext } from "react";
import FollowUser from "../containers/FollowUser";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "./UserTitle.css";

type Props = {
  username: string;
};

function UserTitle({ username }: Props) {
  const { user } = useContext(CurrentUserContext);
  const showFollowUser = user !== undefined && user.username !== username;

  return (
    <div className="UserTitle">
      <h2>@{username}</h2>
      {showFollowUser && <FollowUser username={username} />}
    </div>
  );
}

export default UserTitle;
