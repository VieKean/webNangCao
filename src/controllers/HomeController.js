import express from "express";
const getHomePage = (req, res) => {
    const user = req.session.user; // Lấy thông tin người dùng từ phiên làm việc
    return res.render("home", {
        data: {
            title: 'Trang home',
            content: 'nội dung trang home',
            page: 'main',
            user // Gửi thông tin người dùng tới view
        }
    });
};
export default getHomePage