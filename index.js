// npm init -y
// npm i express ejs mongoose
// mkdir views
// npm i  method-override
const express = require('express');
const app = express();

const path = require('path');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//
const methodOverride = require('method-override');

// middle ware =======================================================
//for parsing the req.body because by default it will be undefined
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// ==========================================
const Product = require('./models/product');

const categories = ['fruit', 'vegetable', 'dairy'];

// ================================================================================================


const mongoose = require('mongoose');
const exp = require('constants');

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

// const categories = ['fruit', 'vegetable', 'dairy'];


// =======================================================================================================

//          RESTFUL ROUTES

// VIEW

app.get('/products', async (req, res) => {
    // const products = await Product.find({}); // await mongoose opeartion to get the data
    // // console.log(products);
    // res.render('products/index.ejs', { products });
    
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index.ejs', {products,category});
    }
    else {
        const products = await Product.find({}); // await mongoose opeartion to get the data
        res.render('products/index.ejs', {products, category:'All'});
    }
        
})

// to serve the form to create a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})









//show page on clicking a single product to view more : DISPLAY

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id); // or Product.findById({ _id : id });
    console.log(product);
    res.render('products/show', {product})
})





// post on submit the form

app.post('/products', async (req, res) => {
    // console.log(req.body);
    const newProduct = new Product(req.body)
    await newProduct.save();

    res.redirect(`/products/${newProduct._id}`);
})



// // update 

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id); 
    res.render('products/edit', {product,categories});
})

// // put req to update the items

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    // findByIdAndUpdate(id,update,options); and it returns a thenable
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true}, {new:true})
    res.redirect(`/products/${product._id}`);
})

//      DELETE

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})