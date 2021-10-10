require("dotenv").config();
import express from "express";
import http from "http";
import logger from "morgan";

import { ApolloServer } from "apollo-server-express";

import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";


import { getUser } from "./users/users.utilis";
import schema from "./schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";



async function startServer() {
const apollo = new ApolloServer({
schema,
context: async ({ req }) => {
if (req) {
return {
loggedInUser: await getUser(req.headers.token),
};
}
},
plugins: [ ApolloServerPluginLandingPageGraphQLPlayground(),
{
async serverWillStart() {
return {
async drainServer() {
subscriptionServer.close();
},
};
},
}
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