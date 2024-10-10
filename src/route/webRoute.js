import express from "express";
import getHomePage from "../controllers/homeController";
import aboutPage from "../controllers/AboutController";
import contactPage from "../controllers/ContactController";
import UserController from "../controllers/UserController";

const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', getHomePage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/listuser', UserController.getAllUser)
    return app.use('/', router)
}

export default initWebRoute
