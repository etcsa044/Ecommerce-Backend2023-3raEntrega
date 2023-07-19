import TicketController from "../controllers/ticket.controller.js";
import BaseRouter from "./Router.js";

const ticketController = new TicketController()

export default class TicketRouter extends BaseRouter {

    init() {

        this.get(
            "/",
            ["PUBLIC"],
            ticketController.getObjects
        )

        this.post(
            "/",
            ["PUBLIC"],
            ticketController.createTicket
        )

    }

}