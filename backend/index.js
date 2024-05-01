import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose"

const app = express();

app.get('/', (req, res) => {
console.log(req);
return response.status(234).send('welcome to MERN stack tutorial')
});

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to database');
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    });    
})
.catch((error)=>{
    console.log(error);
})