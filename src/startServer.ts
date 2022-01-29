import { genSchema } from "./utils/genSchema";
import { createTypeormConn } from "./utils/createTypeormConn";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import getUser from "./middleware/auth";

export const startServer = async () => {
  try {
    const server = new ApolloServer({
      schema: genSchema(),
      context: async ({ req }) => {
        const token = (req.headers["x-auth-token"] as string) || "";
        let user;

        try {
          user = await getUser(token);
        } catch (error) {
          user = null;
        }
        // try to retrieve a user with the token
        return {
          url: req.protocol + "://" + req.get("host"),
          req: req,
          user: user,
        };
      },
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
    // app.use(AuthMiddleware)
    await server.start();
    await app.listen(PORT);
    server.applyMiddleware({ app });
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
};
