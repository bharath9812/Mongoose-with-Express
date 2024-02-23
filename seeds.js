const Product = require('./models/product');
const mongoose = require('mongoose');
main()

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
        .then(() => {
            console.log('MONGO connection open') 
        })
        .catch(err => {
            console.log('MONGO connection error', err);
    })

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
} 

// =======================================================================================================

// this inserted only one we used insertMany down below

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category:'fruit'
// })

// p.save()
//     .then(p => {
//     console.log(p)
//     })
//     .catch(e =>
//         console.log(e))


// =======================================================================================================

                                                // INSERT MANY
                    
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate While Milk',
        price: 2.69,
        category: 'dairy'
    }
]

// if one product fails validation nothing will be inserted in to database
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e)
    })
