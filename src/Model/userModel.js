import pool from '../configs/connectDB'
import connection from '../configs/connectDB'
const getAllUser = async () => {
  const [rows, fields] = await pool.execute('Select * from users')
  return rows
}

const createUser = async (username, password, fullname, address, sex, email) => {
  const [result] = await connection.execute(
      'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, fullname, address, sex, email]
  );
  return result.insertId; // Trả về ID của bản ghi mới được chèn
};



const getUserById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const updateUser = async (id, username, fullname, address, email) => {
  const [result] = await pool.execute(
      'UPDATE users SET username = ?, fullname = ?, address = ?, email = ? WHERE id = ?',
      [username, fullname, address, email, id]
  );
  return result; 
};

const deleteUser = async (id) => {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result; 
};

// Hàm xác thực người dùng
const findUserByUsername = async (username) => {
  const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0]; // Trả về thông tin người dùng nếu tìm thấy
};
export default { getAllUser, createUser, getUserById, updateUser, deleteUser, findUserByUsername}