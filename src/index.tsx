import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloProvider } from "@apollo/client/react";

//Example API takes an userId as the Authoerization heading.
//Can create your own userId using the createUser mutation
const userId = "dd47e22b-c22a-434c-afb3-7bb2a9f2ec23";
export const companyId = "42cf08df-2dbf-4984-9e81-3210cfe6815a";
// Create an http link:
const httpLink = new HttpLink({
  uri:
    "https://w6tcrg3sb4.execute-api.us-east-1.amazonaws.com/example-example-graphql-api",
  headers: {
    Authorization: userId,
  },
});

// Create optional WebSocket link:
const wsLink = new WebSocketLink(
  new SubscriptionClient(
    `wss://156hxo0ega.execute-api.us-east-1.amazonaws.com/example`,
    {
      reconnect: true,
      connectionParams: () => {
        return {
          Authorization: userId,
        };
      },
    },
    undefined,
    []
  )
);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
