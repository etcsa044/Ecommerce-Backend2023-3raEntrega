import userModel from "../models/user.model.js";
import BaseManager from "./baseManager.js";


export default class UsersManager extends BaseManager{

    constructor() {
        super(userModel);
    }

}