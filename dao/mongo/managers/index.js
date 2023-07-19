import CartManager from "./carts.manager.js";
import ProductManager from "./products.manager.js";
import TicketManager from "./tickets.manager.js";
import UsersManager from "./users.manager.js";

export const cartManager = new CartManager()
export const productManager = new ProductManager();
export const ticketManager = new TicketManager()
export const userManager = new UsersManager();