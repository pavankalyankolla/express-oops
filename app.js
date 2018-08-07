const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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

//find by name
app.get('/products/name/:name',(req,res) => {
    let product = Product.findByName(req.params.name);
    if(product){
        res.send(product);
    } else {
        res.send({
            notice : `product with ${req.params.name} is found`
        });
    }
});     

//sort by price
app.get('/products')


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

// to create product

app.post('/products',(req,res) => {
    
    let product = new Product(req.body);
  res.send(product.save());
    //  res.send(product); 

});

// update one product
app.put('/products/:id',(req,res) => {
    let product = Product.findOneAndUpdate(req.params.id,req.body);
    if(product){
        res.send(product);
    } else {
        res.send({
            notice : 'record not found'
        });
    }
});

//delete one product
app.delete('/products/:id',(req,res) => {
    let index = Product.findOneAndRemove(req.params.id);
    if(index < 0){
        res.send({
            notice : 'record not found'
        });
    } 
    res.send({
        notice : 'Successfully deleted the record'
    })
});



app.listen(port,() => {
    console.log('Listening on port',port);
})