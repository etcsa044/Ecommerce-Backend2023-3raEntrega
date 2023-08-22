import BaseRouter from "./Router.js";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController()

export default class ProductRouter extends BaseRouter {

    init() {

        this.post(
            "/mock",
            ["ADMIN"],
            productController.generateMocksProducts
        )

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
            ["ADMIN", "PREMIUM"],
            productController.createProduct
        )

        // Update a product by its ID. [ADMIN access]
        this.put(
            "/:id",
            ["ADMIN", "PREMIUM"],
            productController.updateObject
        )

        // Delete a product by its ID. [ADMIN access]
        this.delete(
            "/:pid",
            ["ADMIN", "PREMIUM"],
            productController.deleteProduct
        )



    }


}