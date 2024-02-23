const mongoose = require('mongoose');

// =======================================================================================================

//              CREATING SCHEMA FOR OUR MODEL
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    category: {
        type: String,
        lowercase:true,
        enum: ['fruit','vegetable','dairy']
    }
})

// =======================================================================================================

//          CREating model from our schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // we can import this model on other file and use it over there