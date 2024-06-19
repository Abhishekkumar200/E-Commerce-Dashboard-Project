import React, { useState } from 'react';

const Addproduct = ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const addProduct = async ()=>{
        // console.log(name, price, category, company);
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        // console.log(error);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:8000/addProduct", {
            method:'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.log(result);
    }
    return(
        <div className='product'>
            <h1>Add product</h1>

            <input type='text' className='inputDiv' placeholder='Enter product name' value={name} onChange={(e)=>{setName(e.target.value)}} />
            {error && !name && <span className='invalid-text'>Enter a valid name</span>}

            <input type='number' className='inputDiv' placeholder='Enter price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            {error && !price && <span className='invalid-text'>Enter a valid price</span>}

            <input type='text' className='inputDiv' placeholder='Enter product category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
            {error && !category && <span className='invalid-text'>Enter a valid category</span>}

            <input type='text' className='inputDiv' placeholder='Enter product company' value={company} onChange={(e)=>{setCompany(e.target.value)}} />
            {error && !company && <span className='invalid-text'>Enter a valid company</span>}

            <button onClick={addProduct} className='btn'>Add Product</button>

        </div>
    )
}

export default Addproduct;