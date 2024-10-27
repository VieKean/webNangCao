import express from 'express'
import dotenv from 'dotenv/config'
import myDateTime from '../date.js'
import { getPath, getParamsURL } from '../getURL.js'
import viewEngine from './configs/viewEngine.js'
import initWebRoute from './route/webRoute'
import bodyParser from 'body-parser'
import session from 'express-session'
import RedisStore from "connect-redis"
import {createClient} from "redis"



const app = express();
const port = process.env.PORT

// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})


app.use(session({
    store: redisStore,
    secret: 'VieKean',
    resave: false,
    saveUninitialized: false, 
    // cookie: { secure: false }
}))



// // Cần có 2 dòng này
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


initWebRoute(app)
viewEngine(app);





app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})