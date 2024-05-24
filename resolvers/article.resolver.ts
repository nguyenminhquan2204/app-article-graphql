import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_, argument) => {
            const { 
                sortKey, 
                sortValue, 
                currentPage, 
                limitItems 
            } = argument;

            // Sort
            const sort = {};
            if(sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            // End Sort

            // Pagination
            const skip = (currentPage - 1) * limitItems;
            // End Pagination

            const articles = await Article.find({
                deleted: false
            }).sort(sort).limit(limitItems).skip(skip);

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