import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Updateproduct = ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    
    const getProductDetails = async ()=>{
        console.log(params);
        let result = await fetch(`http://localhost:8000/product/${params.id}`, {
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    
    useEffect(()=>{
        getProductDetails();
    }, []);

    const updateProduct = async ()=>{
        // console.log(name, price, category, company);
        let result = await fetch(`http://localhost:8000/product/${params.id}`,
        {
            method:'Put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                'Content-Type':"application/json"
            }
        });

        result = await result.json();
        console.log(result);
        navigate('/');
    };
    return(
        <div className='product'>
            <h1>Update product</h1>

            <input type='text' className='inputDiv' placeholder='Enter product name' value={name} onChange={(e)=>{setName(e.target.value)}} />

            <input type='number' className='inputDiv' placeholder='Enter price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />

            <input type='text' className='inputDiv' placeholder='Enter product category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />

            <input type='text' className='inputDiv' placeholder='Enter product company' value={company} onChange={(e)=>{setCompany(e.target.value)}} />

            <button onClick={updateProduct} className='btn'>Update</button>

        </div>
    )
}

export default Updateproduct;