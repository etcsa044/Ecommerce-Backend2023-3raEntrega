
import { passportCall } from "../services/passportcall.service.js";
import BaseRouter from "./Router.js";
import UserController from "../controllers/user.controller.js";

const userController = new UserController()

export default class SessionRouter extends BaseRouter {

    init() {

        this.get(
            "/",
            ["PUBLIC"],
            userController.getObjects
        )

        this.get(
            "/:id",
            ["PUBLIC"],
            userController.getObjectById
        )

        this.get(
            "/:attribute/:value",
            ["PUBLIC"],
            userController.getObjectBy
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
            ["PUBLIC"],
            passportCall(
                "login",
                {
                    strategyType: "locals"
                }
            ),
            userController.userLogin
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
            "/logout",
            ["USER"],
            userController.userLogout
        )


    }
}