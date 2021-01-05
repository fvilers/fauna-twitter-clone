import React from "react";
import TweetList from "../components/TweetList";
import TweetModel from "../models/TweetModel";

function Timeline() {
  // TODO: get user's timeline
  const tweets: TweetModel[] = [
    {
      author: "test",
      createdAt: new Date(2021, 0, 5, 18, 16),
      id: "fake-1",
      tweet: "Fake tweet",
    },
    {
      author: "latin_boy",
      createdAt: new Date(2021, 0, 5, 18, 18),
      id: "fake-2",
      tweet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius atque, nulla molestias aliquam fuga, impedit ut, veniam molestiae odio labore id nostrum ducimus magni pariatur a voluptate iure earum iusto.",
    },
  ];

  return <TweetList items={tweets} />;
}

export default Timeline;
