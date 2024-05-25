import { resolversArticle } from "./article.resolver";
import { resolversCategory } from "./category.resolver";
import { resolversUser } from "./user.resolver";

export const resolvers = [
    resolversCategory,
    resolversArticle,
    resolversUser
];