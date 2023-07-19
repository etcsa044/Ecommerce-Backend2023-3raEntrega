import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema({
    products:{
        type : [
            {
                product:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:"products"
                },
                quantity:{
                    type:Number,
                    default:1            
                },
                cartId:{
                    type:String,
                    default:""
                },
            }
        ],
        default: []
    },
    status:{
        type:Boolean,
        default:true
    }
}, {timestamps:{createdAt:`created_at`, updatedAt:`updated_at`}});

schema.pre('find',function(){
    this.populate("products.product");
})
schema.pre('findOne',function(){
    this.populate("products.product");
})
schema.pre('findById',function(){
    this.populate("products.product");
})



const cartModel = mongoose.model(collection, schema);


export default cartModel;