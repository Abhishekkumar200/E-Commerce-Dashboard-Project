const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require("jsonwebtoken");
const jwtKey = 'e-commerce';

app.post("/register", async(req, res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (err, token)=>{
        if(err)
        {
            res.send({result:"Something went wrong."});
        }
        res.send({result, auth: token});
    });
})

app.post("/login", async (req, res)=>{

    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user)
        {
            Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (err, token)=>{
                if(err)
                {
                    res.send({result:"Something went wrong."});
                }
                res.send({user, auth: token});
            });
        }
        else
        {
            res.send({result:"No user found."});
        }
    }
    else
    {
        res.send({result:"Please provide full information."})
    }

});

app.post("/addProduct", verifyTocken, async (req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/products', verifyTocken, async (req, res)=>{
    const products = await Product.find();
    if(products.length>0)
    {
        res.send(products);
    }
    else{
        res.send({"result":"No products found."});
    }
});

app.delete("/product/:id", verifyTocken, async (req, res)=>{
    // res.send("Connected");
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get('/product/:id', verifyTocken, async (req, res)=>{
    // res.send(`Connected With id ${req.params.id}`);
    let result = await Product.findOne({_id:req.params.id});
    
    if(result)
    {
        res.send(result);
    }
    else
    {
        res.send({result:"Product not found"});
    }
});

app.get("/search/:key", verifyTocken, async (req, res)=>{
    let result = await Product.find({
        "$or": [
            {name: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
            {company: {$regex: req.params.key}}
            // {price: {$regex: req.params.key}}
        ]
    });

    res.send(result);
});

app.put("/product/:id", verifyTocken, async (req, res)=>{
    let result = await Product.updateOne({_id:req.params.id},{
        $set : req.body
    });

    res.send(result);
});

function verifyTocken(req, res, next){
    let token = req.headers['authorization'];
    if(token)
    {
        token = token.split(' ')[1];
        // console.log("Api called. ", token);
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err)
            {
                res.status(401).send({result:"Please provide a valid token."});
            }
            else
            {
                next();
            }
        })
    }
    else
    {
        res.status(403).send({result:"Please add token with headers."});
    }
    // next();
};

app.listen(8000);

