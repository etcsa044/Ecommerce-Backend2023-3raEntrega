import BaseRouter from "./Router.js";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController()

export default class ProductRouter extends BaseRouter {

    init() {

        // Retrieve all products. [PUBLIC access]
        this.get(
            "/",
            ["PUBLIC"],
            productController.getObjects
        )

        // Retrieve a product by its ID. [PUBLIC access]
        this.get(
            "/:id",
            ["PUBLIC"],
            productController.getObjectById
        )

        // Retrieve products based on a specific attribute and value. [PUBLIC access]
        this.get(
            "/:attribute/:value",
            ["PUBLIC"],
            productController.getObjectBy
        )

        // Create a new product. [PRIVATE access]
        this.post(
            "/",
            ["PUBLIC"],
            productController.createProduct
        )

        // Update a product by its ID. [ADMIN access]
        this.put(
            "/:id",
            ["PUBLIC"],
            productController.updateObject
        )

        // Delete a product by its ID. [ADMIN access]
        this.delete(
            "/:id",
            ["PUBLIC"],
            productController.deleteObject
        )

    }


}