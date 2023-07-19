import { cartServices, productServices } from "../services/indexServices.js";
import BaseController from "./Controller.js";


const cartService = cartServices;
const productService = productServices;

export default class CartController extends BaseController {
    constructor() {
        super(cartService, productService)
    }

    cartService = cartService;
    productService = productService;

    // Create a new cart.
    create = async (req, res) => {
        const newCart = req.body;
        this.cartService.createObject(newCart);
        res.sendSuccess("Cart created successfully")
    }

    // Add a product to the cart or increase its quantity if already exists.
    addProductToCart = async (req, res) => {
        const { cid, pid } = req.params;
        const cart = await this.cartService.getObjectById(cid);
        if (!cart) return res.sendNotFound("Cart Not Found.");
        const product = await this.productService.getObjectById(pid);
        if (!product) return res.sendNotFound("Product Not Found.");

        const exist = cart.products.some(e => e.product._id.toString() === pid);

        try {
            if (!exist) {
                await this.cartService.addProductToCart(cid, pid);
                res.sendSuccess("Product added to cart successfully");
            } else {
                await this.cartService.increaseProductQuantity(cid, pid);
                res.sendSuccess("Quantity modified successfully");

            }
        } catch (error) {
            res.sendInternalError(error);
        }
    }

    // Increase the quantity of a product in the cart.
    increaseProductQuantity = async (req, res) => {
        const { cid, pid } = req.params
        try {
            await this.cartService.increaseProductQuantity(cid, pid);
            res.sendSuccess()
        } catch (error) {
            res.sendInternalError(error)
        }
    }

    // Decrease the quantity of a product in the cart. If it reaches 0, it remains unchanged.
    decreaseProductQuantity = async (req, res) => {
        const { cid, pid } = req.params;
        const cart = await this.cartService.getObjectById(cid);
        const product = cart.products.filter(e => e.product._id.toString() == pid);

        if (product[0].quantity === 0) return res.status(400).send({ status: "error", message: "Current quantity is 0" })

        try {
            await this.cartService.decreaseProductQuantity(cid, pid);
            res.sendSuccess()
        } catch (error) {
            res.sendInternalError(error)
        }
    }


    // Remove a product from the cart.
    removeProductFromCart = async (req, res) => {
        const { cid, pid } = req.params;
        const cart = await this.cartService.getObjectByParam({ _id: cid });
        if (!cart) return res.sendNotFound("Cart Not Found.");
        const product = cart.products.filter(e => e.product._id.toString() == pid);
        console.log(product)
        if (product.length === 0) return res.sendNotFound("Product Not Found.");
        try {
            const result = await this.cartService.removeProductFromCart(cid, pid);
            res.sendSuccess("Product removed from cart successfully");
        } catch (error) {
            res.sendInternalError(error);
        }
    }
}