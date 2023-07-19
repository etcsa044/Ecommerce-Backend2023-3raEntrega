import CartController from "../controllers/cart.controller.js";
import BaseRouter from "./Router.js";


const cartController = new CartController();

export default class CartRouter extends BaseRouter {

    init() {
        // Retrieve all carts.
        this.get(
            "/",
            ["PUBLIC"],
            cartController.getObjects
        )

        // Retrieve a cart by its ID.
        this.get(
            "/:id",
            ["PUBLIC"],
            cartController.getObjectById
        )

        // Retrieve carts based on a specific attribute and value.
        this.get(
            "/:attribute/:value",
            ["PUBLIC"],
            cartController.getObjectBy
        )

        // Create a new cart.
        this.post(
            "/",
            ["PUBLIC"],
            cartController.create
        )

        // Add a product to the cart or increase its quantity if already exists.
        this.put(
            "/:cid/product/:pid",
            ["PUBLIC"],
            cartController.addProductToCart
        )

        // Increase the quantity of a product in the cart.
        this.put(
            "/:cid/productinc/:pid",
            ["PUBLIC"],
            cartController.increaseProductQuantity
        )

        // Decrease the quantity of a product in the cart. If it reaches 0, it remains unchanged.
        this.put(
            "/:cid/productdec/:pid",
            ["PUBLIC"],
            cartController.decreaseProductQuantity
        )

        // Remove a product from the cart.
        this.delete(
            "/:cid/product/:pid",
            ["PUBLIC"],
            cartController.removeProductFromCart
        )

    }
}