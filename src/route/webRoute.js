import express from "express";
import getHomePage from "../controllers/HomeController";
import aboutPage from "../controllers/AboutController";
import contactPage from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import checkLogin from "../middleware/auth";
import checkUserPermissions from "../middleware/checkPermissions";

const router = express.Router();

const initWebRoute = (app) => {
    // Public routes
    router.get('/', getHomePage);
    router.get('/about', aboutPage);
    router.get('/contact', contactPage);
    router.get('/login', UserController.getLogin);
    router.post('/login', UserController.loginUser);
    router.post('/logout', UserController.logoutUser);
    router.get('/listuser', UserController.getAllUser);
    router.get('/register', UserController.getRegister); 
    router.post('/register', UserController.registerUser); 


    // Protected routes requiring login
    router.post('/createUser', checkLogin, UserController.createUser);
    router.get('/listuser/:id', checkLogin, checkUserPermissions('view'), UserController.viewUserDetails);
    router.get('/editUser/:id', checkLogin, checkUserPermissions('edit'), UserController.editUser);
    router.post('/editUser/:id', checkLogin, checkUserPermissions('edit'), UserController.updateUser);
    router.post('/deleteUser/:id', checkLogin, checkUserPermissions('delete'), UserController.deleteUser);

    return app.use('/', router);
};


export default initWebRoute;
