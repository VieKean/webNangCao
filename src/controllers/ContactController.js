import express from "express";
const contactPage = (req, res) => {
    const user = req.session.user;
    return res.render("home", {data: {title: 'Trang contact', content : 'nội dung trang contact', page:'contact', user}})
}
export default contactPage