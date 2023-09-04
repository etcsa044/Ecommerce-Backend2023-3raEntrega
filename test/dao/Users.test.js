import mongoose, { mongo } from "mongoose";
import UsersDao from "../../src/dao/mongo/managers/users.manager.js"
import Assert from "assert";
import config from "../../src/config.js";

mongoose.connect(config.mongo.URL_TEST);

const assert = Assert.strict;

describe("MANAGERS's Users Testing", function () {

    this.timeout(5000);

    before(function () {
        this.userDao = new UsersDao();
    })
    
    this.beforeEach(function(){
        mongoose.connection.collections.users.drop();
    })


    it("Manager should retrieve an array of USERS", async function () {
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result), true);
    })

    it("Manager should insert a new user in the DB", async function () {
        const mockUser = {
            first_name: "Usuario",
            last_name: "Test",
            email: "test@unitario.com",
            password: "123"
        }

        const result = await this.userDao.create(mockUser)
        assert.ok(result._id);
    })

    it("Manager should retrieve a specific user by email", async function(){
        const user = this.userDao.getBy({email:"test@unitario.com"});
        assert.strictEqual(typeof user, "object");
    })


})