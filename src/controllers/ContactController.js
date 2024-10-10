import express from "express";
const contactPage = (req, res) => {
    return res.render("home", {data: {title: 'Trang contact', content : 'nội dung trang contact', page:'contact'}})
}
export default contactPage