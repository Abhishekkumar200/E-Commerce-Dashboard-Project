import React, {useState} from 'react';


const UserProfile = ()=>{
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [id, setId] = useState("");
    const data = JSON.parse(localStorage.getItem("user"));
    console.log(data);
    
    return(
        <div className='profile'>
            <div className='content'>
            <h2>Name: {data.name}</h2>
            <h2>Email: {data.email}</h2>
            <h2>User Id: {data._id}</h2>
            </div>
        </div>
    )
};

export default UserProfile;