import BaseController from "./Controller.js";
import { productServices } from "../services/indexServices.js";
import { generateProduct } from "../mocks/products.mocks.js";
import MailingService from "../services/mailing.service.js";
import DTemplates from "../constants/DTemplates.js";

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
            stock,
        } = req.body;

        const owner = req.user.user.email;
        console.log(owner);

        //"complete values" validation:
        if (!title || !description || !category || !thumbnail || !code || !price || !stock) return res.sendIncompleteValues();

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
            stock,
            owner:owner
        }
        console.log(productToAdd)

        try {
            this.service.createObject(productToAdd);
            res.sendSuccess();
        } catch (error) {
            res.sendInternalError(error)
        }

    }


    generateMocksProducts = async (req, res) => {
        
        const products = [];
        for (let i = 0; i < 1; i++) {
            products.push(generateProduct())
        }
        
        try {
            await productService.createManyObjects(products)
            res.sendSuccessWithPayload(products);
        } catch (error) {
            res.sendInternalError(error);
        }
    }

    deleteProduct = async (req, res) => {
        const {pid} = req.params;
        const {user} = req.user;
        console.log(user)
        const productToDelete = await productService.getObjectById(pid);
        if(!productToDelete) return res.sendBadRequest("product doesn't exist")
        const owner = productToDelete.owner || "admin"
        console.log(owner)
        switch (user.role) {
            case 'premium':
                if(owner === user.email){
                    try {
                        const result = await productService.deleteObject(pid)
                        console.log(result)
                        res.sendSuccess()
                    } catch (error) {
                        return res.sendInternalError(error);
                    }
                }else{
                    res.sendBadRequest("DENIED - You are not the owner of this product")
                }
                
                break;
            case 'ADMIN':
                try {
                    
                    if(productToDelete.owner != "..."){
                        const maillingService = new MailingService();
                        const result = await maillingService.sendMail(owner, DTemplates.EXPIRED, {});
                    }
                    const result = await productService.deleteObject(pid);
                    res.sendSuccess()
                } catch (error) {
                    return res.sendInternalError(error);
                }
                
            default:
                break;
        }
        
        
    }


}


