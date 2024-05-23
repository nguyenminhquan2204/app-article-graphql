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
        },

        getArticle: async (_, argument) => {
            const { id } = argument;

            const article = await Article.findOne({
                _id: id,
                deleted: false,
            });

            return article;
        }
    },

    Mutation: {
        createArticle: async (_, argument) => {
            const { article } = argument;

            const record = new Article(article);
            await record.save();

            return record;
        },

        deleteArticle: async (_, argument) => {
            const { id } = argument;

            await Article.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });

            return "Đã xóa thành công!";
        }
    }
};


// mutation {
//     createArticle(article: {
//       title: "Bai viet ...",
//       avatar: "link...",
//       description: "Mo ta ..."
//     }) {
//       title,
//       description
//     }
//   }

// query {
//     getArticle(id: "65468fbb834f8b56a156e571") {
//       id,
//       title,
//       description
//     }
//   }