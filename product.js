class Product {
    constructor(params){
        this.id = params.id;
        this.name = params.name;
        this.price = params.price
    }

    save(){ 
    let result = Product.data.find(product => {
        return product.id == this.id
      })
      let res = Product.data.find(product => {
        return product.name === this.name;
      })
      if (result) {
        return { notice: 'id already exists' }
      } else if (res) {
        return { notice: 'name exists' }
      }
      else if (this.price <= 0) {
        return { notice: 'price cannot be 0' }
      } else {
        Product.data.push(this)
        return this
      }
    }

    static findAll(){
        return Product.data;
    }

    static findOne(id){
        return Product.data.find((product) => {
            return product.id == id
        });
    }

    static findByName(name){
        return Product.data.find((product) => {
            return product.name == name
        });
    }


    static findOneAndUpdate(id,params){
    let product = Product.data.find((product) => {
        return product.id == id;
    });

    //if product is found
    if(product){
        //if the parameters doesn't contain the property then retain the existing value else use the new values sent in the parameters
        product.name = typeof params.name == 'undefined' ? product.name : params.name;
        product.price = typeof params.price == 'undefined' ? product.price : params.price;
     }
     return product;
    }

    static findOneAndRemove(id){
        let index = Product.data.findIndex((product) => {
            return product.id == id;
        })

        if(index >= 0){
            Product.data.splice(index,1);
        }
        return index;
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