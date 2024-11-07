import {getAllCategories} from '../Model/categoryModel'


export const showAllCategories = async (req, res) => {
  const categories = await getAllCategories();
  return res.status(200).json({
    errCode: 1,
    message: "Show List categories Success",
    result: categories
  });
};
