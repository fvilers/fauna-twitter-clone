import { query as q, values } from "faunadb";
import TweetModel from "../models/TweetModel";
import client from "./Client";
import { UserData } from "./Users";

export type TweetData = {
  createdAt: values.FaunaTime;
  tweet: string;
  userRef: values.Ref;
};

/*
{
  name: "create-tweet",
  role: "server",
  body: Query(
    Lambda(
      ["text"],
      Let(
        {
          tweet: Create(Collection("tweets"), {
            data: {
              createdAt: Now(),
              tweet: Var("text"),
              userRef: CurrentIdentity()
            }
          })
        },
        {
          author: Get(Select(["data", "userRef"], Var("tweet"))),
          tweet: Var("tweet")
        }
      )
    )
  )
}
*/
export async function composeTweet(
  text: string,
  secret: string
): Promise<TweetModel> {
  const { author, tweet } = await client.query<{
    author: values.Document<UserData>;
    tweet: values.Document<TweetData>;
  }>(q.Call("create-tweet", [text]), { secret });
  const model: TweetModel = {
    author: author.data.username,
    createdAt: tweet.data.createdAt.date,
    id: tweet.ref.id,
    tweet: tweet.data.tweet,
  };

  return model;
}

/*
{
  name: "get-timeline",
  role: "server",
  body: Query(
    Lambda(
      "identity",
      Map(
        Paginate(
          Union(
            Join(
              Match(Index("following_by_followers"), Var("identity")),
              Index("tweets_by_userRef")
            ),
            Match(Index("tweets_by_userRef"), Var("identity"))
          )
        ),
        Lambda(
          "item",
          Let(
            { tweet: Get(Select([1], Var("item"))) },
            {
              author: Get(Select(["data", "userRef"], Var("tweet"))),
              tweet: Var("tweet")
            }
          )
        )
      )
    )
  )
}
*/
export async function getTimeline(secret: string): Promise<TweetModel[]> {
  const { data } = await client.query<
    values.Document<
      {
        author: values.Document<UserData>;
        tweet: values.Document<TweetData>;
      }[]
    >
  >(q.Call("get-timeline", q.CurrentIdentity()), { secret });
  const model: TweetModel[] = data.map(({ author, tweet }) => ({
    author: author.data.username,
    createdAt: tweet.data.createdAt.date,
    id: tweet.ref.id,
    tweet: tweet.data.tweet,
  }));

  return model;
}
