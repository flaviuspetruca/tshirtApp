const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tip: {
        type: String,
        required: true
    },
    pret: {
        type: Number,
        required: true
    },
    marime: {
        type: String,
        required: true
    },
    productImage: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('articol', schema);