import { getAllCategories } from "../Model/categoryModel"

export const addCategoriesToLocals = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.locals.categories = categories;
        next();
    } catch (error) {
        console.error("Failed to load categories", error);
        next(error);
    }
};
