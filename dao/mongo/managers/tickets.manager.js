import ticketModel from "../models/ticket.model.js";
import BaseManager from "./baseManager.js";


export default class TicketManager extends BaseManager {
    constructor(){
        super(ticketModel);
    }
}