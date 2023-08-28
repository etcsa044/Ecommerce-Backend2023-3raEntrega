import mongoose, { mongo } from "mongoose";
import UsersDao from "../../src/dao/mongo/managers/users.manager.js"
import Assert from "assert";
import config from "../../src/config.js";

console.log(config.mongo.URL_TEST)

mongoose.connect(config.mongo.URL_TEST);

const assert = Assert.strict;

describe( "MANAGERS's Users Testing", ()=>{

    before(function(){
        this.userDao = new UsersDao();
    })

    beforeEach(function(){
        this.timeout(100000);
    })

    it("Manager should retrieve an array of USERS", async function(){
        const result = await this.userDao.get();
        console.log(result)
        assert.strictEqual(Array.isArray(result), true);
        resolve();
    })


})