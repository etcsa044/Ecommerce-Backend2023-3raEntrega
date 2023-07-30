import ViewsController from "../controllers/views.controller.js";
import BaseRouter from "./Router.js";


const viewsController = new ViewsController()

export default class ViewsRouter extends BaseRouter {

    init() {

        this.get(
            "/",
            ["PUBLIC"],
            viewsController.renderIndex
        )

        this.get(
            '/cart',
            ['PUBLIC'],
            viewsController.renderCart
        )

        this.get(
            "/login",
            ["NO_AUTH"],
            (req, res) => {
                res.render("login");
            });

        this.get(
            "/register",
            ["NO_AUTH"],
            (req, res) => {
                res.render("register");
            }
        )

        this.get(
            "/ticket/:tid",
            ["PUBLIC"],
            viewsController.renderTicket
        )

        this.get(
            "/loggertest",
            ["PUBLIC"],
            (req, res) => {
                console.log('Testing');
                res.send("TESTING")
            }
        )
    }

}



// // Vista Index:
// router.get("/", privacy("PRIVATE"), (req, res) => {
//     res.render("index");
// });

// // Vista Login:
// router.get("/login", privacy("NO_AUTH"), (req, res) => {
//     res.render("login");
// });

// router.get("/register", privacy("NO_AUTH"), (req, res) => {
//     res.render("register");
// });



