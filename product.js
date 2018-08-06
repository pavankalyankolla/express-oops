class Product {
    constructor(params){
        this.id = params.id;
        this.name = params.name;
        this.price = params.price;
    }

    save(){
        Product.data.push(this)
    }


    static findAll(){
        return Product.data;
    }

    static findOne(id){
        return Product.data.find((product) => {
            return product.id == id
        });
    }

}

Product.data = [  
{
     id : 1,
    name : 'Marker',
    price : 15,
    
},
{
    id : 2,
    name : 'Scale',
    price:5,
},
{
    id : 3,
    name : 'Board',
    price : 30,

}]

module.exports ={
    Product
}