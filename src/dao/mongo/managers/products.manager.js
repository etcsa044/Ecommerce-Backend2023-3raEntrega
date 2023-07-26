import BaseManager from "./baseManager.js";
import productModel from "../models/product.model.js";

export default class ProductManager extends BaseManager {
    constructor() {
        super(productModel);
    }
}