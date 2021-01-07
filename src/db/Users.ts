import { query as q, values } from "faunadb";
import UserModel from "../models/UserModel";
import client from "./Client";

/*
{
  name: "users_by_username",
  unique: true,
  serialized: true,
  source: "users",
  terms: [
    {
      field: ["data", "username"]
    }
  ]
}
*/
export type UserData = {
  createdAt: values.FaunaTime;
  username: string;
};

/*
{
  name: "followers_unique",
  unique: true,
  serialized: true,
  source: "followers",
  terms: [
    {
      field: ["data", "follower"]
    },
    {
      field: ["data", "following"]
    }
  ]
}

{
  name: "following_by_followers",
  unique: false,
  serialized: true,
  source: "followers",
  terms: [
    {
      field: ["data", "follower"]
    }
  ],
  values: [
    {
      field: ["data", "following"]
    }
  ]
}
*/
type FollowData = {
  createdAt: values.FaunaTime;
  follower: values.Ref;
  following: values.Ref;
};

/*
{
  name: "create-user",
  role: "server",
  body: Query(
    Lambda(
      ["username", "password"],
      Create(Collection("users"), {
        credentials: { password: Var("password") },
        data: { createdAt: Now(), username: Var("username") }
      })
    )
  )
}
*/
export async function signUp(
  username: string,
  password: string
): Promise<UserModel> {
  const { data, ref } = await client.query<values.Document<UserData>>(
    q.Call("create-user", [username, password])
  );
  const model: UserModel = {
    createdAt: data.createdAt.date,
    id: ref.id,
    username: data.username,
  };

  return model;
}

/*
{
  name: "authenticate-user",
  role: "server",
  body: Query(
    Lambda(
      ["username", "password"],
      Login(Match(Index("users_by_username"), Var("username")), {
        password: Var("password")
      })
    )
  )
}
*/
export async function signIn(
  username: string,
  password: string
): Promise<string> {
  const { secret } = await client.query<{ secret: string }>(
    q.Call("authenticate-user", [username, password])
  );

  return secret;
}

export async function signOut(secret: string): Promise<boolean> {
  const result = await client.query<boolean>(q.Logout(true), { secret });

  return result;
}

/*
{
  name: "is-following",
  role: "server",
  body: Query(
    Lambda(
      "username",
      Let(
        { user: Match(Index("users_by_username"), Var("username")) },
        If(
          Exists(Var("user")),
          Let(
            {
              following: Match(Index("followers_unique"), [
                CurrentIdentity(),
                Select("ref", Get(Var("user")))
              ])
            },
            Exists(Var("following"))
          ),
          false
        )
      )
    )
  )
}
*/
export async function getIsFollowing(
  username: string,
  secret: string
): Promise<boolean> {
  const result = await client.query<boolean>(q.Call("is-following", username), {
    secret,
  });

  return result;
}

/*
Query(
  Lambda(
    "username",
    Create(Collection("followers"), {
      data: {
        createdAt: Now(),
        follower: CurrentIdentity(),
        following: Select(
          "ref",
          Get(Match(Index("users_by_username"), Var("username")))
        )
      }
    })
  )
)
*/
export async function followUser(
  username: string,
  secret: string
): Promise<void> {
  await client.query<values.Document<FollowData>>(
    q.Call("follow-user", username),
    { secret }
  );
}

/*
Query(
  Lambda(
    "username",
    Delete(
      Select(
        "ref",
        Get(
          Match(Index("followers_unique"), [
            CurrentIdentity(),
            Select(
              "ref",
              Get(Match(Index("users_by_username"), Var("username")))
            )
          ])
        )
      )
    )
  )
)
*/
export async function unfollowUser(
  username: string,
  secret: string
): Promise<void> {
  await client.query<values.Document<FollowData>>(
    q.Call("unfollow-user", username),
    { secret }
  );
}
