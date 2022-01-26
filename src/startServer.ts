// import * as ApolloServer from "apollo-server";
import { genSchema } from "./utils/genSchema";
import { createTypeormConn } from "./utils/createTypeormConn";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import express from "express";
import { ApolloServer } from "apollo-server-express";

export const startServer = async () => {
  try {
    const server = new ApolloServer({
      schema: genSchema(),
      context: ({ req }) => ({
        url: req.protocol + "://" + req.get("host"),
        req: req,
      }),
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: "my-graph-id@my-graph-variant",
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
    });

    await createTypeormConn();
    const PORT = 4000;
    const app = express();
    await server.start();
    server.applyMiddleware({ app });
    await app.listen(PORT);
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

