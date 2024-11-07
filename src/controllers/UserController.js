import express from "express"
import userModel from "../Model/userModel"
import bcrypt from 'bcrypt';
import checkAuth from '../middleware/auth'


const getAllUser = async (req, res) => {
    // Lấy danh sách người dùng từ cơ sở dữ liệu
    let userList = await userModel.getAllUser();

    // Lấy thông tin người dùng từ session
    const user = req.session.user;
    

    // Gửi thông tin đến view
    res.render('home', { 
        data: { 
            title: 'List User', 
            page: 'listUser', 
            rows: userList,
            user // Truyền thông tin người dùng vào view
        } 
    });
};




const createUser = async (req, res) => {
    const { username, hashedPassword, confirmPassword, fullname, address, sex, email, role, accountStatus } = req.body;

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
    if (hashedPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Mật khẩu không khớp' });
    }

    try {
        // Băm mật khẩu
        const hashed = await bcrypt.hash(hashedPassword, 10);

        // Lưu người dùng vào cơ sở dữ liệu
        const userId = await userModel.createUser(username, hashed, fullname, address, sex, email, role, accountStatus);
        return res.redirect('/listuser');
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
    const { fullname, address, sex, email } = req.body;
    try {
        const result = await userModel.updateUser(userId, fullname, address, sex, email);
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

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await userModel.deleteUser(userId);

        if (result.affectedRows > 0) {
            // Kiểm tra nếu người dùng đang xóa tài khoản của chính họ
            if (req.session.user && req.session.user.id === userId) {
                // Hủy session để đăng xuất
                req.session.destroy(err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Lỗi máy chủ khi đăng xuất');
                    }
                    return res.redirect('/listuser'); // Chuyển hướng đến trang chính sau khi đăng xuất
                });
            } else {
                return res.redirect('/listuser'); // Chuyển hướng về trang danh sách sau khi xóa
            }
        } else {
            return res.status(400).send('Không thể xóa người dùng');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Lỗi máy chủ');
    }
};

const getLogin = (req, res) => {
    // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng tới trang khác
    if (req.session.user) {
        return res.redirect('/listuser');
    }

    // Hiển thị form login với biến message trống (null) nếu không có lỗi
    return res.render('login', { message: null });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findByUsername(username);

    if (!user) {
        // Truyền thông báo lỗi nếu username không đúng
        return res.status(400).render('login', { message: 'Tên đăng nhập sai' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        // Truyền thông báo lỗi nếu password không đúng
        return res.status(400).render('login', { message: 'Sai thông tin tài khoản hoặc mật khẩu' });
    }

    // Lưu thông tin vào session và chuyển hướng đến trang khác nếu đăng nhập thành công
    req.session.user = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role
    };

    return res.redirect('/');
};

const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Unable to log out. Please try again later.');
        }
        res.redirect('/'); 
    });
};

const getRegister = (req, res) => {
    return res.render('register', { message: null });
};

const registerUser = async (req, res) => {
    const { username, password, confirmPassword, fullname, address, sex, email } = req.body;

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
    if (password !== confirmPassword) {
        return res.status(400).render('register', { message: 'Mật khẩu không khớp' });
    }

    try {
        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Đặt vai trò mặc định là 'user'
        const role = 'user';

        // Lưu người dùng vào cơ sở dữ liệu
        await userModel.createUser(username, hashedPassword, fullname, address, sex, email, role);
        
        return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).render('register', { message: 'Lỗi khi đăng ký người dùng' });
    }
};


export default { getAllUser, createUser, viewUserDetails, editUser, updateUser, deleteUser, loginUser, getLogin, logoutUser, getRegister, registerUser }

// OK