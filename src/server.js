import express from 'express'
import dotenv from 'dotenv/config'
import myDateTime from '../date.js'
import { getPath, getParamsURL } from '../getURL.js'
import viewEngine from './configs/viewEngine.js'
import initWebRoute from './route/webRoute'
import initAPIRoute from './route/apiRoute'
import bodyParser from 'body-parser'
import session from 'express-session'
import RedisStore from "connect-redis"
import {createClient} from "redis"
import { addCategoriesToLocals } from './middleware/categoryMiddleware.js';
import cors from 'cors';



const app = express();
const port = process.env.PORT||8081

// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})
app.use(cors({
  origin: 'http://localhost:3000'  // Chỉ cho phép truy cập từ frontend trên localhost:3000
}));


app.use(session({
    store: redisStore,
    secret: 'VieKean',
    resave: false,
    saveUninitialized: false, 
    cookie: { secure: false }
}))


// Thêm middleware trước khi định nghĩa các route
app.use(addCategoriesToLocals);
// // Cần có 2 dòng này gọi thẳng mặt bởi express
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

initWebRoute(app);
initAPIRoute(app)
viewEngine(app);


app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})