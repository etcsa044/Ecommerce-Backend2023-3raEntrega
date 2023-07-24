import { cartServices, productServices, ticketServices } from "../services/indexServices.js";


const productService = productServices;
const cartService = cartServices;
const ticketService = ticketServices;

export default class ViewsController {
    
    renderIndex = async (req, res) => {
        
        let {user} = req.user;
        const products = await productService.getAllObjects();       
        res.render('index', {user, products});
    }

    renderCart = async (req, res) => {
        const {user} = req.user
        const cart = await cartService.getObjectById(user.cartId)
        
        cart.products.map(e => {
            const subTotal = e.quantity * e.product.price;
            e.subTotal = subTotal;
        })

        cart.total = cart.products.reduce((acum, e) => acum + e.subTotal,0)
       
        res.render('cart', {cart});
    }

    renderTicket = async (req, res) => {
        const {tid} = req.params;
        const ticket = await ticketService.getObjectById(tid);
        res.render("ticket",{ticket});
    }

}
