import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth)
        {
            navigate("/");
        }
    });
    const handleLogin = async ()=>{
        console.log(email, password);
        let result = await fetch('http://localhost:8000/login', {
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.auth)
        {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
        }
        else
        {
            alert("Please enter correct datails.");
        }
    };

    return(
        <div className='login'>
            <h1>Login</h1>

            <input className='inputDiv' type='email'  placeholder='Enter Email' onChange = {(e)=>setEmail(e.target.value)} value = {email} />

            <input className='inputDiv' type='password'  placeholder='Enter Password' onChange = {(e)=>setPassword(e.target.value)} value = {password} />

            <button onClick={handleLogin} className='btn' type='button'>Login</button>

        </div>
    )
};

export default LogIn;