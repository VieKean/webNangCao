import express from "express";
const aboutPage = (req, res)=>{
    const user = req.session.user;
    return res.render("home", {data: {title: 'Trang about', content : 'nội dung trang about', page:'about', user }})
}
export default aboutPage