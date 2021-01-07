import assert from "assert";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";
import AuthContext from "../contexts/AuthContext";
import { followUser, getIsFollowing, unfollowUser } from "../db/Users";
import AsyncOperation from "../types/AsyncOperation";

type Props = {
  username: string;
};

type State = AsyncOperation & {
  isFollowing?: boolean;
};

function FollowUser({ username }: Props) {
  const [{ busy, errorMessage, isFollowing }, setState] = useState<State>({
    busy: false,
  });
  const { secret } = useContext(AuthContext);
  const handleFollowOrUnfollow = async () => {
    assert(secret);
    setState((s) => ({ ...s, busy: true, errorMessage: undefined }));

    try {
      isFollowing
        ? await unfollowUser(username, secret)
        : await followUser(username, secret);
      setState((s) => ({ ...s, busy: false, isFollowing: !s.isFollowing }));
    } catch (error) {
      console.error(error);
      setState((s) => ({
        ...s,
        busy: false,
        errorMessage: error.description || error.message,
      }));
    }
  };

  useEffect(() => {
    assert(secret);

    const loadData = async () => {
      try {
        const isFollowing = await getIsFollowing(username, secret);
        setState((s) => ({ ...s, busy: false, isFollowing }));
      } catch (error) {
        console.error(error);
        setState((s) => ({
          ...s,
          busy: false,
          errorMessage: error.description || error.message,
        }));
      }
    };

    loadData();
  }, [username, secret]);

  if (isFollowing === undefined) {
    return null;
  }

  return (
    <>
      <Button
        disabled={busy}
        onClick={handleFollowOrUnfollow}
        variant={isFollowing ? "error" : undefined}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      {errorMessage && <Message variant="error">{errorMessage}</Message>}
    </>
  );
}

export default FollowUser;
