const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;
app.use(bodyParser.json());

app.use((req,res,next) => {
    console.log(`${req.method} : ${req.url} : ${req.ip} : ${new Date()}`);
    next();
});

app.get('/',(req,res) => {
    res.send({
        msg: 'welcome to our e-commerce store'
    })
})

// REST - Representational   State Tranfer Protocol

// To perform an operational on a resource / data you will need to a end point with a specific  http method

//dummy db
let products  = [{
    id : 1,
    name : 'Marker',
    price : 15,
    cat_id: 1
},
{
    id : 2,
    name : 'Scale',
    price:5,
    cat_id: 1
},
{
    id : 3,
    name : 'Board',
    price : 30,
    cat_id: 2
}
];
let categories = [{
    id : 1,
    name : 'Sports'
},
{
    id :2,
    name : 'Stationary'
},
{
    id : 3,
    name : 'Books'
}];

//READ 
// GET - /products
// GET - /products/:id (show a specific product)
// app.METHOD(PATH , HANDLER)
app.get('/products',(req,res) => {
    // res.send({
    //     msg : 'get request made for /products'
    // });
    res.send(products);
});

app.get('/category',(req,res) => {
    res.send(categories);
})

app.get('/products/:id',(req,res) => {
    let product = products.find((product)  => {
        return product.id == req.params.id;
    });
    if(product){
        res.send(product);
    } else {
        res.send({
            notice : `product with id ${req.params.id} not found`
        })
    }
});

app.get('/category/:id',(req,res) => {
    let category = categories.find((category) => {
        return category.id == req.params.id;
    });
    if(category){
        res.send(category);
    } else {
        res.send({
            notice : `category with id ${req.params.id} not found`
        })
    }
});

app.get('/category/:category_id/products',(req,res) => {
    let result = products.filter((product) => {
        return product.cat_id == req.params.category_id;
    }) 
    res.send(result);
    
})


//CREATE
// POST - /products
app.post('/products',(req,res) => {
    // res.send({
    //     msg : 'post request made for /products'
    // });
    let product = req.body;
    products.push(product);
    res.send({
        product,
        notice : 'Sucessfully created a product'
    });
});

app.post('/category',(req,res) => {
    let category = req.body;
    categories.push(category);
    res.send({
        categories,
        notice: 'Successfully created a category'
    })
})

//UPDATE
// PUT - /products/:id
app.put('/products/:id',(req,res) => {
    // res.send({
    //     msg : 'put request made for /products/${req.params.id}'
    // });
    let product = products.find((product) => {
        return product.id = req.params.id;
    })
    if(product){
        product.price = req.body.price;
        res.send({
            product,
            notice : 'Successfully updated the product'
        });
    } else {
        res.send({
            notice : `product with id ${req.params.id} not found`
        })
    }
});

app.put('/category/:id',(req,res) => {
    let category = categories.find((category) => {
        return category.id = req.params.id;
    })
    if(category){
        category.name = req.body.name;
        res.send({
            category,
            notice : 'Sucessfully updated the category'
        })
    } else {
        res.send({
            notice : `category with id ${req.params.id} not found`
        })
    }
});

//DESTROY
// DELETE - /products/:id
app.delete('/products/:id',(req,res) => {
    // res.send({
    //     msg : 'delete request made for /products/${req.params.id}'
    // });
    let index = products.findIndex((product) => {
        return product.id == req.params.id;
    });
    if(index >= 0){
        products.splice(index,1);
        res.send({
            notice : 'Successfully removed the product'
        })
    } else {
        res.send({
            notice : `product with id ${req.params.id} not found`
        })
    }
});
app.delete('/category/:id',(req,res) => {
    let index = categories.findIndex((category) => {
        return category.id == req.params.id;
    });
    if(index >= 0){
        categories.splice(index,1)
        res.send({
            notice : 'Successfully removed the category'
        })
    } else {
        res.send({
            notice : `category with id ${req.params.id} not found `
        })
    }
});

app.listen(port,() => {
    console.log('Listening on port',port);
})