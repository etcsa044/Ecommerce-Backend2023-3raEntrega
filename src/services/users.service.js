import { userManager } from "../../dao/mongo/managers/index.js";
import BaseService from "./baseService.js";

const manager = userManager


export default class UserService extends BaseService {

    constructor() {
        super(manager)
    }

}