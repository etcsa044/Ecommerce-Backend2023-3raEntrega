import UserDTO from "../dtos/user.dto.js";
import { cartServices, productServices, ticketServices, userServices } from "../services/indexServices.js";
import { JwtService } from "../utils/utils.js";


const productService = productServices;
const cartService = cartServices;
const ticketService = ticketServices;
const userService = userServices;
const jwtService = new JwtService();

export default class ViewsController {

    renderIndex = async (req, res) => {
        const { user } = req.user || {}
        const products = await productService.getAllObjects();
        res.render('index', { user, products });
    }

    renderCart = async (req, res) => {
        try {
            const { user } = req.user
            const cart = await cartService.getObjectById(user.cartId)
            cart.products.map(e => {
                const subTotal = e.quantity * e.product.price;
                e.subTotal = subTotal;
            })
            cart.total = cart.products.reduce((acum, e) => acum + e.subTotal, 0)
            res.render('cart', { cart });

        } catch (error) {
            req.logger.info("User will be redirected to LOGIN");
            res.redirect("/login");
        }
    }

    renderTicket = async (req, res) => {
        const { tid } = req.params;
        const ticket = await ticketService.getObjectById(tid);
        res.render("ticket", { ticket });
    }

    restoreRequest = (req, res) => {
        res.render('restoreRequest');
    }

    restorePassword = async (req, res) => {
        const { token } = req.query;
        try {
            const validToken = await jwtService.verify(token);
        } catch (error) {
            res.render('invalidToken');
        }
        res.render('restorePassword')
    }

    renderUsers = async (req, res) => {
        const { user } = req.user;
        const users = await userService.getAllObjects();
        const publicUsers = UserDTO.getPublicUsers(users);
        res.render("users", { publicUsers, user });
    }

}
