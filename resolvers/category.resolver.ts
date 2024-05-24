import Category from "../models/category.model";

export const resolversCategory = {
    Query: {
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

    Mutation: {
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