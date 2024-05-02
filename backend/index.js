import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";

const app = express();

//middleware to parse request body
app.use(express.json());

app.get('/', (request, response) => {
console.log(request);
return response.status(234).send('welcome to MERN stack tutorial')
});

//route to save a new book
app.post('/books', async (request, response) => {
    try{
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })

        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(200).send(book);

    } catch(err){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//route to get all books
app.get('/books', async (request, response) => {
    try{
        const books = await Book.find({})

        return response.status(200).json({
            count : books.length,
            data: books,
        });

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//route to get one book from database, through its ID
app.get('/books/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.findById(id)

        return response.status(200).json(book);

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//route to update a book

app.put('/books/:id', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).send({message: 'Book not found'})
        } else {
            return response.status(200).send({message: 'Book updated successfully'})
        }

        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({error: error.message})
    }
})

//route to delete a boook
app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id)

        if (!result){
            return response.status(404).send({message: 'Book not found'})
        }
        return response.status(200).send({message: 'Book successfully deleted'}) //alternative way to write else of if-else statement

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: message.error})
    }
})


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