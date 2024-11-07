import { getAllProducts, getProductById } from '../Model/productModel';

const showAllProducts = async (req, res) => {
  const products = await getAllProducts();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    result: products
  });
};

const showProductDetail = async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  return res.status(200).json({
    errCode: 1,
    message: "Show Product Detail Success",
    result: product
  });
};

export {showAllProducts,showProductDetail}
