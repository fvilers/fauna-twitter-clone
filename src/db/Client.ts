import { Client } from "faunadb";

const client = new Client({ secret: process.env.REACT_APP_FAUNA_SECRET || "" });

export default client;
