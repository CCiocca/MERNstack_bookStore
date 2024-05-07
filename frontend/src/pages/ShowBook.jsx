import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';   
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBooks] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response)=>{
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[])
  return (
    <div>ShowBook</div>
  )
}

export default ShowBook