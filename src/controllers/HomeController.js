import express from "express";
const getHomePage = (req, res) => {
    return res.render("home", {data: {title: 'Trang home', content : 'nội dung trang home', page:'main'}})
}
export default getHomePage