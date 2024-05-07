import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware to parse request body
app.use(express.json());

//middleware to handle CORS POLICY
//option 1: allow all origins with default of cors(*)
app.use(cors());
//option 2: allow custom origins 
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

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