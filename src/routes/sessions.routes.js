
import { passportCall } from "../services/passportcall.service.js";
import BaseRouter from "./Router.js";
import UserController from "../controllers/user.controller.js";

const userController = new UserController()

export default class SessionRouter extends BaseRouter {

    init() {

        this.get(
            "/mock",
            ["PUBLIC"],
            userController.generateMocksUsers
        )

        this.get(
            "/premium/:id",
            ["PUBLIC"],
            userController.changeRole
        )
        
        this.get(
            "/",
            ["ADMIN"],
            userController.getObjects
        )

        this.get(
            "/:id",
            ["USER", "ADMIN"],
            userController.getObjectById
        )

        this.get(
            "/:attribute/:value",
            ["USER"],
            userController.getObjectBy
        )

        this.get(
            "/jwt",
            ["PUBLIC"],
            passportCall(
                "jwt",
                {
                    strategyType: "jwt"
                }
            ),
            (req, res) => {
                res.sendSuccessWithPayload(req.user);
            }
        )

        this.post(
            "/register",
            ["NO_AUTH"], // public, admin, private
            passportCall(
                "register",
                {
                    strategyType: "locals"
                }
            ),
            userController.createUser
        );


        this.post(
            "/login",
            ["NO_AUTH"],
            passportCall(
                "login",
                {
                    strategyType: "locals"
                }
            ),
            userController.userLogin
        )



        this.post(
            "/logout",
            ["PREMIUM", "USER"],
            userController.userLogout
        )

        this.post(
            "/restoreRequest",
            ["NO_AUTH"],
            userController.restoreRequest
        )

        this.post(
            "/restorePassword",
            ["PUBLIC"],
            userController.restorePassword
        )

        


    }
}