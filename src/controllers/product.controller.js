import BaseController from "./Controller.js";
import { productServices } from "../services/indexServices.js";

const productService = productServices;

export default class ProductController extends BaseController {

    constructor() {
        super(productService)
    }

    
    //create
    createProduct = async (req, res) => {

        const products = await this.service.getAllObjects()

        const {
            title,
            description,
            category,
            thumbnail,
            code,
            price,
            stock
        } = req.body;

        //"complete values" validation:
        if (!title || !description || !category || !thumbnail || !code || !price || !stock) return res.sendIncompletesValues();

        //"duplicated code" validation:
        let exist = products.some(e => e.code === code);

        if (exist) return res.status(400).send({ status: "error", message: "The entered code already exists" })

        const productToAdd = {
            title,
            description,
            category,
            thumbnail,
            code,
            price,
            stock
        }

        try {
            this.service.createObject(productToAdd);
            res.sendSuccess();
        } catch (error) {
            res.sendInternalError(error)
        }

    }
}


