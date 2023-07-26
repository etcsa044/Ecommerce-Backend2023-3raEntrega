import moment from "moment";
import alphanumeric from "alphanumeric-id";
import { cartServices, productServices, ticketServices, userServices } from "../services/indexServices.js";
import BaseController from "./Controller.js";


const ticketService = ticketServices;
const productService = productServices;
const userService = userServices;
const cartService = cartServices


export default class TicketController extends BaseController {

    constructor() {
        super(ticketService, productService, userService, cartService);
    }


    createTicket = async (req, res) => {
        
        //Get user
        const { user } = req.user;
        const uid = user.id;
        const updatedUser = await userService.getObjectById(uid)

        //Get cart:
        const userCart = updatedUser.cart

        
        //Get products on cart:
        const productsOnCart = userCart.products;
        

        //products stock Check:
        const availableProducts = [];
        const unavailableProducts = [];

        function checkStock(productsOnCart){
            productsOnCart.map( e => {
                const isAvailable = e.product.stock >= e.quantity;
                if(isAvailable){
                    const processedProducts = {
                        code: e.product.code,
                        title : e.product.title,
                        price : e.product.price,
                        quantity : e.quantity
                    }
                    availableProducts.push(processedProducts);
                }else{
                    unavailableProducts.push();
                }
            })
        }
        checkStock(productsOnCart);

        if(availableProducts.length === 0){
            alert('There is no products availables on cart')
            alert('You will be redirected to Home')
            res.redirect('/');
        }
        
        //Get Amount:
        let amount = availableProducts.reduce((acum, e) => acum + (e.price * e.quantity) , 0);
        
        //Get purchaser mail:
        let purchaser = updatedUser.email;


        //ticket code creation
        let currentMoment = moment.now().toString();
        let alphanumericCode = alphanumeric(4)
        let code = alphanumericCode.concat(currentMoment);

        const newTicket = {
            code: code,
            products : availableProducts,
            amount: amount,
            purchaser: purchaser
        }

        


        //Update Stock Process:
        async function updateStock(e) {
            const id = e.product._id.toString();
            if (e.product.stock >= e.quantity) {
              const updatedStock = e.product.stock - e.quantity;
              await productService.updateObject(id, { stock: updatedStock });
            }
          }         
          
          productsOnCart.map((e) => updateStock(e));

     
        try {
            const result = await ticketService.createObject(newTicket);
            await cartService.updateObject(userCart._id, {products : unavailableProducts});
            res.sendSuccessWithPayload(result)

        } catch (error) {
            res.sendInternalError(error);
        }

    }


}