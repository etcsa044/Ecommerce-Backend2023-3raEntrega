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

        this.get(
            "/loggerTest",
            ["PUBLIC"],
            async (req, res) => {
                req.logger.fatal('fatal');
                req.logger.error('error');
                req.logger.warning('warning');
                req.logger.http('http');
                req.logger.info('info');
                req.logger.debug('debug');

                res.sendStatus(200)
            }
        )

    }

}