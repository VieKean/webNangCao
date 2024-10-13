import express from "express";
import getHomePage from "../controllers/HomeController";
import aboutPage from "../controllers/AboutController";
import contactPage from "../controllers/ContactController";
import UserController from "../controllers/UserController";

const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/listuser', UserController.getAllUser)
    router.post('/createUser', UserController.createUser)
    router.get('/listuser/:id', UserController.viewUserDetails);
    router.get('/editUser/:id', UserController.editUser); // Route để hiển thị form sửa
    router.post('/editUser/:id', UserController.updateUser); // Route để xử lý cập nhật thông tin
    router.post('/deleteUser/:id', UserController.deleteUser); 

    return app.use('/', router)
}

export default initWebRoute
