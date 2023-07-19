import { JwtService } from "../utils/utils.js";
import BaseController from "./Controller.js";
import { userServices } from "../services/indexServices.js";



const userService = userServices;
const jwtService = new JwtService()


export default class UserController extends BaseController {

    constructor() {
        super(userService);
    }

    createUser = async (req, res) => {
        res.sendSuccess();
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

}