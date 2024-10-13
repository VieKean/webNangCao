import express from "express"
import userModel from "../Model/userModel"
const getAllUser = async (req, res) => {
    let userList = await userModel.getAllUser()
    res.render('home', { data: { title: 'List User', page: 'listUser', rows: userList } })
}

const createUser = async (req, res) => {
    const { username, fullname, address, email } = req.body
    try {
        const newUserId = await userModel.createUser(username, fullname, address, email)
        return res.redirect('/listuser')
    } catch (error) {
        console.error(
            'Error adding user:',
            error
        )
        return res
            .status(500)
            .send('Error adding user')
    }
}
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
export default { getAllUser, createUser, viewUserDetails, editUser, updateUser, deleteUser }