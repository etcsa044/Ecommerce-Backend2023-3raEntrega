import { productManager } from "../../dao/mongo/managers/index.js";
import BaseService from "./baseService.js";

const manager = productManager

export default class ProductService extends BaseService {
    constructor(){
        super(manager);
    }
}