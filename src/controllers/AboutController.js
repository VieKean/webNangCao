import express from "express";
const aboutPage = (req, res)=>{
    return res.render("home", {data: {title: 'Trang about', content : 'nội dung trang about', page:'about'}})
}
export default aboutPage