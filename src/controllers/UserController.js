import express from "express"
import userModel from "../Model/userModel"
import bcrypt from 'bcrypt';

const getAllUser = async (req, res) => {
    let userList = await userModel.getAllUser()
    res.render('home', { data: { title: 'List User', page: 'listUser', rows: userList } })
}


const createUser = async (req, res) => {
    const { username, hashedPassword, confirmPassword, fullname, address, sex, email } = req.body;

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
    if (hashedPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Mật khẩu không khớp' });
    }

    try {
        // Băm mật khẩu
        const hashed = await bcrypt.hash(hashedPassword, 10);

        // Lưu người dùng vào cơ sở dữ liệu
        const userId = await userModel.createUser(username, hashed, fullname, address, sex, email);
        return res.redirect('/listuser')
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Lỗi khi lưu người dùng vào cơ sở dữ liệu' });
    }
};
const viewUserDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.getUserById(userId);
        if (user) {
            return res.render('userDetails', { user });
        } else {
            return res.status(404).send('Không tìm thấy User');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

// Hiển thị form sửa thông tin người dùng
const editUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.getUserById(userId);
        if (user) {
            return res.render('editUser', { user });
        } else {
            return res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, fullname, address, email } = req.body;
    try {
        const result = await userModel.updateUser(userId, username, fullname, address, email);
        if (result.affectedRows > 0) {
            // Nếu không muốn chuyển hướng, bạn có thể gửi một thông báo
            return res.redirect('/listuser');

        } else {
            return res.status(400).send('Failed to update user');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await userModel.deleteUser(userId);
        if (result.affectedRows > 0) {
            return res.redirect('/listuser'); // Chuyển hướng về trang danh sách sau khi xóa
        } else {
            return res.status(400).send('Failed to delete user');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
};
const getLogin = (req, res) => {
    return res.render("home", {data: {title: 'Trang login', content : 'nội dung trang login', page:'login'}})
}
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
        }

        // Kiểm tra mật khẩu
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
        }

        // Đăng nhập thành công
        req.session.userId = user.id; // Lưu ID người dùng vào phiên
        // res.status(200).json({ message: 'Đăng nhập thành công' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Lỗi khi đăng nhập' });
    }
};

export default { getAllUser, createUser, viewUserDetails, editUser, updateUser, deleteUser, loginUser,getLogin }