import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";

const startServer = async () => {
    dotenv.config();

    database.connect();

    const app: Express = express();
    const port: number | string = process.env.PORT || 3000;

    // GraphQL
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
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


// Cau lenh graph
// query(
//     $sortKey: String,
//     $sortValue: String,
//     $currentPage: Int,
//     $limitItems: Int,
//     $filterKey: String,
//     $filterValue: String,
//     $keyword: String
//   ) {
//     getListArticle(
//       sortKey: $sortKey,
//       sortValue: $sortValue,
//       currentPage: $currentPage,
//       limitItems: $limitItems,
//       filterKey: $filterKey,
//       filterValue: $filterValue,
//       keyword: $keyword
//      ) {
//       id
//       title
//       avatar
//       description
//     }
//   }
// end


// // Rest API
// app.get("/articles", async (req: Request, res: Response) => {
//     const articles = await Article.find({
//         deleted: false
//     });

//     res.json({
//         articles: articles
//     });
// });
