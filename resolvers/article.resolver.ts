import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_, argument) => {
            const { 
                sortKey, 
                sortValue, 
                currentPage, 
                limitItems,
                filterKey,
                filterValue,
                keyword
            } = argument;

            const find = {};

            // Sort
            const sort = {};
            if(sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            // End Sort

            // Pagination
            const skip = (currentPage - 1) * limitItems;
            // End Pagination

            // Filter
            if(filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            // End Filter

            // Search
            if(keyword) {
                const keywordRegex = new RegExp(keyword, "i");
                find["title"] = keywordRegex;
            }
            // End Search

            const articles = await Article.find(find).sort(sort).limit(limitItems).skip(skip);

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