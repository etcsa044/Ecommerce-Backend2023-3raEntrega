import mongoose from "mongoose";
import BaseManager from "./baseManager.js";
import cartModel from "../models/cart.model.js";

export default class CartManager extends BaseManager {
    constructor() {
        super(cartModel)
    }

    // Add a product to the cart by its ID (id) and product ID (pid).
    addProductToCart = (id, pid) => {
        return this.model.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    products: {
                        product: new mongoose.Types.ObjectId(pid),
                        quantity: 1,
                        cartId: id
                    }
                }
            }
        );
    }

    // Increase the quantity of a product in the cart by its ID (id) and product ID (pid).
    increaseProductQuantity = (id, pid) => {
        return this.model.findOneAndUpdate(
            { _id: id, 'products.product': pid },
            { $inc: { 'products.$.quantity': 1 } }
        );
    }

    // Decrease the quantity of a product in the cart by its ID (id) and product ID (pid).
    decreaseProductQuantity = (id, pid) => {
        return this.model.findOneAndUpdate(
            { _id: id, 'products.product': pid },
            { $inc: { 'products.$.quantity': -1 } }
        );
    }

    // Remove a product from the cart by its ID (id) and product ID (pid).
    removeProductFromCart = (id, pid) => {
        try {
            return this.model.findOneAndUpdate(
                { _id: id, 'products.product': pid },
                { $pull: { products: { product: pid } } }
            );
        } catch (error) {
            return error;
        }
    }

}
