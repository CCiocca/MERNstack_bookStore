import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"

const app = express();

//middleware to parse request body
app.use(express.json());

app.get('/', (request, response) => {
console.log(request);
return response.status(234).send('welcome to MERN stack tutorial')
});

app.use('/books', booksRoute);

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