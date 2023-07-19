
import mongoose from "mongoose";
import config from "../../config.js";

export default class MongoSingleton {
    
    static #instance;

    constructor () {
        mongoose.connect(config.mongo.URL);
    }

    static getInstance() {
        if(this.#instance){
            console.log("Instance has already been referenced");
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        console.log("Database connection successful.");
        return this.#instance;
    }


}