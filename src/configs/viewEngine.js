import express from 'express'
import path from 'path'
const viewEngine=(app)=>{
    app.set("view engine", "ejs")
    app.set("views", "./src/views")

    //config static files
    app.use(express.static(path.join(__dirname, '../public')));
}
export default viewEngine