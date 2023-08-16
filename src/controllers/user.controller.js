import { Hasher, JwtService } from "../utils/utils.js";
import BaseController from "./Controller.js";
import { cartServices, userServices } from "../services/indexServices.js";
import { generateUser } from "../mocks/user.mocks.js";
import MailingService from "../services/mailing.service.js";
import DTemplates from "../constants/DTemplates.js";
import UserDTO from "../dtos/user.dto.js";



const cartService = cartServices;
const userService = userServices;
const jwtService = new JwtService()
const hasher = new Hasher()



export default class UserController extends BaseController {

    constructor() {
        super(userService);
    }

    createUser = async (req, res) => {
        const mailingService = new MailingService();
        const user = await req.user;
        try {
            const result = await mailingService.sendMail(user.email, DTemplates.WELCOME, user)
            res.sendSuccess("Registered");
        } catch (error) {
            res.sendInternalError(error)
        }
    }

    userLogin = (req, res) => {
        const token = jwtService.generateToken(req.user);
        res.cookie("authToken",
            token,
            {
                maxAge: 1000 * 3600,
                httpOnly: true,
            }
        ).sendSuccess("Login succesfully");
    }

    userLogout = (req, res) => {
        return res.clearCookie("authToken").sendSuccess("Logout Succesfully")
    }

    generateMocksUsers = async (req, res) => {
        const users = [];
        for (let i = 0; i < 100; i++) {
            users.push(generateUser())
        }
        
        try {
            let usersChecked = [];
            await Promise.all(users.map(async e => {
                
                try {
                    
                    const first_name = e.first_name;
                    const last_name = e.last_name;
                    const email = e.email;
                    const password = e.password;
                    
                    if (!first_name || !last_name || !email || !password) return //done(null, false, { status: "Error", error: "Debe completar todos los campos" });
                    let user = users.includes( e => e.email === email);
                    
                    
                    if (user) return //done(null, false, { message: "El email ya se encuentra registrado" });
                    const hashedPassword = await hasher.createHash(password);
                    
                    const cart = await cartService.createObject();
                    
                    user = {
                        first_name,
                        last_name,
                        email,
                        cart: cart._id.toString(),
                        password: hashedPassword
                    }

                    
                    usersChecked.push(user)
                    return usersChecked
                    
                } catch (error) {
                    console.log(error)
                }
            }))
            
            const result = await userService.createManyObjects(usersChecked);
            res.sendSuccessWithPayload(result)
        } catch (error) {
            res.sendInternalError(error)
        }        
    }

    restoreRequest = async (req, res)=>{
        const {email} = req.body;
        if(!email) return res.sendIncompleteValues("Ingresa una dirección de correo válido.")
        const user = await userService.getObjectByParam({email});
        if(!user) return res.sendNotFound("El correo ingresado, no existe en nuestra base de datos") 
        
        const restoreToken = jwtService.generateToken(UserDTO.restoreToken(user))
        const mailingService = new MailingService();
        const result = await mailingService.sendMail(user.email,DTemplates.RESTORE,{restoreToken})
    }

    restorePassword = async (req, res) => {
        
    }

}