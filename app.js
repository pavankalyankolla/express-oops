const express = require('express');
const app = express();
const { Product } = require('./product')
const port = 3000;


app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url} : ${req.ip} : ${new Date()}`);
    next();
});

app.get('/',(req,res) => {
    res.send({
        msg:'Welcome to our store'
    });
});

//get all product

app.get('/products',(req,res) => {
    let products = Product.findAll();
    res.send(products);
});

// get one product

app.get('/products/:id',(req,res) => {
    let product = Product.findOne(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.send({
            msg : `product with id:${req.params.id} is not found`
        })
    }
});

app.listen(port,() => {
    console.log('Listening on port',port);
})