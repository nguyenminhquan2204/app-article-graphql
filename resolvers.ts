import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
    Query: {
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
        },

        getListCategory: async () => {
            const categorys = await Category.find({
                deleted: false
            });

            return categorys;
        },

        getCategory: async (_, argument) => {
            const { id } = argument;

            const category = await Category.findOne({
                deleted: false,
                _id: id
            });

            return category;
        },
    },

    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;

            const category = await Category.findOne({
                _id: categoryId,
                deleted: false
            });

            return category;
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
        },

        updateArticle: async (_, argument) => {
            const { id, article } = argument;

            await Article.updateOne({
                _id: id,
                deleted: false
            }, article);

            const record = await Article.findOne({
                _id: id
            });

            return record;
        },

        createCategory: async (_, argument) => {
            const { category } = argument;

            const record = new Category(category);
            await record.save();

            return record;
        },
        updateCategory: async (_, argument) => {
            const { id, category } = argument;

            await Category.updateOne({
                _id: id,
                deleted: false
            }, category);

            const record = await Category.findOne({
                _id: id
            });

            return record;
        },
        deleteCategory: async (_, argument) => {
            const { id } = argument;

            await Category.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });

            return "Đã xóa thành công!";
        },
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