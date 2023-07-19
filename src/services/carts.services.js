import { cartManager } from "../../dao/mongo/managers/index.js";
import BaseService from "./baseService.js";


const manager = cartManager

export default class CartService extends BaseService {

    constructor() {
        super(manager)
    }

    addProductToCart = (pid, cid) => this.manager.addProductToCart(pid, cid);

    increaseProductQuantity = (id, pid) => this.manager.increaseProductQuantity(id, pid);
    
    decreaseProductQuantity = (id, pid) => this.manager.decreaseProductQuantity(id, pid);

    removeProductFromCart = (id, pid) => this.manager.removeProductFromCart(id, pid)
}