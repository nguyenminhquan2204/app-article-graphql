import Article from "./models/article.model";

export const resolvers = {
    Query: {
        hello: () => {
            return "Quan Chi";
        },

        getListArticle: async () => {
            const articles = await Article.find({
                deleted: false
            });

            return articles;
        }
    }
};