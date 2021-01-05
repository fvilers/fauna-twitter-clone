import { query as q, values } from "faunadb";
import UserModel from "../models/UserModel";
import client from "./Client";

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
  const { data, ref } = await client.query<{ data: UserData; ref: values.Ref }>(
    q.Call("create-user", [username, password])
  );
  const model: UserModel = {
    createdAt: data.createdAt.date,
    id: ref.id,
    username: data.username,
  };

  return model;
}
