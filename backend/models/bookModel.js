import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';

const bookSchema  = mongoose.Schema(
    {
        title: {
            type: String,
            reqired: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);
