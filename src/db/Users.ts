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
export type UserData = {
  createdAt: values.FaunaTime;
  username: string;
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
