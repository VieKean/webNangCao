import express from 'express'
import dotenv from 'dotenv/config'
import myDateTime from '../date.js'
import {getPath, getParamsURL} from '../getURL.js'
import viewEngine from './configs/viewEngine.js'
import initWebRoute from './route/webRoute'

const app = express();
const port = process.env.PORT



// Cần có các dòng này trong `app.js` hoặc file chính
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


initWebRoute(app)
viewEngine(app);





app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)})