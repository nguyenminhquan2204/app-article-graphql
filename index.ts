import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
    dotenv.config();

    database.connect();

    const app: Express = express();
    const port: number | string = process.env.PORT || 3000;

    // GraphQL
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });
    // End GraphQL

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};

startServer();




// // Rest API
// app.get("/articles", async (req: Request, res: Response) => {
//     const articles = await Article.find({
//         deleted: false
//     });

//     res.json({
//         articles: articles
//     });
// });
