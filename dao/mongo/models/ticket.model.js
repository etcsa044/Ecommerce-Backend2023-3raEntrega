import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        products: [],
        amount: Number,
        purchaser: String
    },
    {
        timestamps: { createdAt: "Purchase_datetime", updatedAt: "Updated_datetime" }
    }
);

const ticketModel = mongoose.model(collection, schema);

schema.pre('find',function(){
    this.populate("products.product");
})
schema.pre('findOne',function(){
    this.populate("products.product");
})

export default ticketModel;