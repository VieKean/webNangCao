import mysql from 'mysql2/promise';
import connection from '../configs/connectDB'

export const getAllProducts = async () => {
  const [rows,fields] = await connection.execute('SELECT * FROM product');
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM product WHERE product_id = ?', [id]);
  return rows[0];
};

// Lấy danh sách sản phẩm theo nhóm (mã nhóm)
export const getProductsByCategory = async (categoryId) => {
  const [rows] = await connection.execute('SELECT * FROM product WHERE category_id = ?', [categoryId]);
  return rows;
};
