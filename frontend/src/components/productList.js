import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ()=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    }, []);

    const getProducts = async ()=>{
        let result = await fetch("http://localhost:8000/products",{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id)=>{
        // console.log(id);
        let result = await fetch(`http://localhost:8000/product/${id}`, {
            method:"Delete",
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        if(result)
        {
            getProducts();
        }
    }
    // console.log(products);
    const searchHandle = async (event)=>{
        let key = event.target.value;

        if(key)
        {
            let result = await fetch(`http://localhost:8000/search/${key}`, {
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            if(result)
            {
                setProducts(result);
            }
        }
        else
        {
            getProducts();
        }
    }

    return(
        <div className='product-list'>
            <h1>Hello! Product List</h1>
            <input type='text' className='search' placeholder='Search' onChange={searchHandle} />
            <ul>
                <li><b>S. No</b></li>
                <li><b>Name</b></li>
                <li><b>Price</b></li>
                <li><b>Category</b></li>
                <li><b>Company</b></li>
                <li><b>Operation</b></li>
            </ul>
            {
                products.length>0 ? products.map((item, index)=>
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li> &#8377; {item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button className='del-btn' onClick={()=>deleteProduct(item._id)}>Delete</button>
                    <Link to={`/update/${item._id}`}>Update</Link>
                    </li>
                </ul>
                
                ):
                <h4>No product found.</h4>
            }
        </div>
    );
};

export default ProductList;