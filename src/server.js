require("dotenv").config();
import express from "express";
import http from "http";
import logger from "morgan";

import { ApolloServer } from "apollo-server-express";

import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

import { getUser } from "./users/users.utilis";
import schema from "./schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

async function startServer() {
  const apollo = new ApolloServer({
    schema,
    context: async (context) => {
      if (context.req) {
        return {
          loggedInUser: await getUser(context.req.headers.token),
        };
      } else {
        return {
          loggedInUser: context.loggedInUser,
        };
      }
    },
    playgroud: true,
    introspection: true,

    plugins: [
      // ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apollo.start();
  const app = express();
  app.use(logger("tiny"));

  apollo.applyMiddleware({ app });

  const httpServer = http.createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect({ token }) {
        if (!token) {
          throw new Error("You can't listen");
        }
        const loggedInUser = await getUser(token);
        return {
          // return onconnect will go to context
          loggedInUser,
        };
      },
    },
    {
      server: httpServer,
      path: apollo.graphqlPath,
    }
  );

  const PORT = process.env.PORT;
  await new Promise((resolve) => httpServer.listen(PORT, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
}
startServer();
