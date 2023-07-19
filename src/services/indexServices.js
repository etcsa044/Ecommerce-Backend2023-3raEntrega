import CartService from "./carts.services.js";
import ProductService from "./product.service.js";
import TicketService from "./tickets.service.js";
import UserService from "./users.service.js";


export const userServices = new UserService();
export const productServices = new ProductService();
export const ticketServices = new TicketService()
export const cartServices = new CartService();