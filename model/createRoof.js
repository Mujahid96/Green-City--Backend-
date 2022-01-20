const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const RoofItemSchema = new mongoose.Schema(
    {
        product: { type: ObjectId, ref: "Product" }
        
       
    },
    { timestamps: true }
);

const RoofItem = mongoose.model("RoofItem", RoofItemSchema);

const RoofProductSchema = new mongoose.Schema(
    {
        products: [RoofItemSchema],
        photo: {
            
            data: Buffer, 
            contentType:String,
           
        }, 
        description: String,
        name: {
            type: String,
            trim: true, 
            required: true,
            maxlength: 32
        },
        location:String,
        user: { type: ObjectId, ref: "User" }
    },
    { timestamps: true }
);

const RoofProduct = mongoose.model("RoofProduct", RoofProductSchema);

// module.exports = { Order, CartItem };
//Using order model concept
module.exports = { RoofProduct, RoofItem };
