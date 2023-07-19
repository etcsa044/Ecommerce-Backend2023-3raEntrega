import { ticketManager } from "../../dao/mongo/managers/index.js";
import BaseService from "./baseService.js";

const manager = ticketManager;

export default class TicketService extends BaseService {
    constructor(){
        super(manager)
    }
}