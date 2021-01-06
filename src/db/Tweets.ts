import { query as q, values } from "faunadb";
import TweetModel from "../models/TweetModel";
import client from "./Client";
import { UserData } from "./Users";

/*
{
  name: "tweets_by_author",
  unique: false,
  serialized: true,
  source: "tweets",
  terms: [
    {
      field: ["data", "author"]
    }
  ],
  values: [
    {
      field: ["data", "createdAt"],
      reverse: true
    },
    {
      field: ["ref"]
    }
  ]
}
*/
export type TweetData = {
  author: values.Ref;
  createdAt: values.FaunaTime;
  tweet: string;
};

function mapTweet(
  author: values.Document<UserData>,
  tweet: values.Document<TweetData>
): TweetModel {
  return {
    author: author.data.username,
    createdAt: tweet.data.createdAt.date,
    id: tweet.ref.id,
    tweet: tweet.data.tweet,
  };
}

/*
{
  name: "create-tweet",
  role: "server",
  body: Query(
    Lambda(
      "text",
      Let(
        {
          tweet: Create(Collection("tweets"), {
            data: {
              author: CurrentIdentity(),
              createdAt: Now(),
              tweet: Var("text")
            }
          })
        },
        {
          author: Get(Select(["data", "author"], Var("tweet"))),
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
  }>(q.Call("create-tweet", text), { secret });
  const model = mapTweet(author, tweet);

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
              Index("tweets_by_author")
            ),
            Match(Index("tweets_by_author"), Var("identity"))
          )
        ),
        Lambda(
          "item",
          Let(
            { tweet: Get(Select([1], Var("item"))) },
            {
              author: Get(Select(["data", "author"], Var("tweet"))),
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
  const model = data.map(({ author, tweet }) => mapTweet(author, tweet));

  return model;
}

/*
{
  name: "get-user-tweets",
  role: "server",
  body: Query(
    Lambda(
      "username",
      Map(
        Paginate(
          Join(
            Match(Index("users_by_username"), Var("username")),
            Index("tweets_by_author")
          )
        ),
        Lambda(
          "item",
          Let(
            { tweet: Get(Select([1], Var("item"))) },
            {
              author: Get(Select(["data", "author"], Var("tweet"))),
              tweet: Var("tweet")
            }
          )
        )
      )
    )
  )
}
*/
export async function getUserTweets(username: string): Promise<TweetModel[]> {
  const { data } = await client.query<
    values.Document<
      {
        author: values.Document<UserData>;
        tweet: values.Document<TweetData>;
      }[]
    >
  >(q.Call("get-user-tweets", username));
  const model = data.map(({ author, tweet }) => mapTweet(author, tweet));

  return model;
}
