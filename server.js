import express from 'express'
import dotenv from 'dotenv/config'
import myDateTime from './date.js'
import {getPath, getParamsURL} from './getURL.js'
import viewEngine from './viewEngine.js';
const app = express();
const port = process.env.PORT
viewEngine(app);


app.get('/', (req, res)=>
    {
        res.render("home");
    }
)

app.get('/about', (req, res)=>
    {
        res.render("about");
    }
)


app.get('/date', (req, res) => {
    const mydate = myDateTime();
    res.send(`Ngày hiện tại: ${mydate}`);
});

// app.get('/getpara', (req, res) => {
//     const para = getParamsURL(req);
//     res.send(para);
// });

app.get('/geturl', (req, res) => {
    const path = getPath(req);
    res.send(path);
});

app.get('/ejs', (req, res) => {
    res.render("test");
});


app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)})