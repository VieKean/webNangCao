import pool from '../configs/connectDB'
import connection from '../configs/connectDB'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const getAllUser = async () => {
  const [rows, fields] = await pool.execute('Select * from users')
  return rows
}

const createUser = async (username, password, fullname, address, sex, email, role = 'user', accountStatus = 'hoạt động') => {
  const [result] = await connection.execute(
      'INSERT INTO users (username, password, fullname, address, sex, email, role, account_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [username, password, fullname, address, sex, email, role, accountStatus]
  );
  return result.insertId; // Trả về ID của bản ghi mới được chèn
};



const getUserById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

const updateUser = async (id, fullname, address, sex, email) => {
  const [result] = await pool.execute(
      'UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?',
      [fullname, address, sex, email, id]
  );
  return result; 
};

const deleteUser = async (id) => {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result; 
};


const findByUsername = async (username) => {
  const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0]; 
};

// Lấy người dùng từ database
const findUserByUsername = async (username) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

// Kiểm tra mật khẩu
const verifyPassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

// Tạo token JWT
const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET || 'levikhang';  // Sử dụng biến môi trường cho chìa khóa bí mật
  return jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin },
    secretKey,  // Sử dụng chìa khóa bí mật từ biến môi trường
    { expiresIn: '1h' }
  );
};



export { getAllUser, createUser, getUserById, updateUser, deleteUser, findByUsername, findUserByUsername, verifyPassword, generateToken}