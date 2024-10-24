import express from "express";
import getHomePage from "../controllers/HomeController";
import aboutPage from "../controllers/AboutController";
import contactPage from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import checkAuth from "../middleware/auth"

const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', (req, res) => {
        if (req.session && req.session.user) {
            res.redirect('/dashboard');
        } else {
            res.redirect('/login');
        }
    });

    router.get('/about', aboutPage);
    router.get('/contact', contactPage);
    router.get('/get-session', (req, res) => {
        res.send(req.session);
    });

    router.get('/login', UserController.getLogin);
    router.post('/login', UserController.loginUser);

    // Apply authentication for protected routes
    router.get('/listuser', checkAuth, UserController.getAllUser);
    router.post('/createUser', checkAuth, UserController.createUser);
    router.get('/listuser/:id', checkAuth, UserController.viewUserDetails);
    router.get('/editUser/:id', checkAuth, UserController.editUser); 
    router.post('/editUser/:id', checkAuth, UserController.updateUser); 
    router.post('/deleteUser/:id', checkAuth, UserController.deleteUser);

    return app.use('/', router);
};


export default initWebRoute
