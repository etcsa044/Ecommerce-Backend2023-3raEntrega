import mongoose from "mongoose";
import { expect } from "chai";
import UsersDao from "../../src/dao/mongo/managers/users.manager.js"
import config from "../../src/config.js";
import { Hasher } from "../../src/utils/utils.js";
import UserDTO from "../../src/dtos/user.dto.js";

mongoose.connect(config.mongo.URL_TEST);

describe("CHAI Testing", function () {

    this.timeout(5000);

    before(function () {
        this.userDao = new UsersDao();
    })


    it("Manager should retrieve an array of USERS", async function () {
        const result = await this.userDao.get();
        expect(Array.isArray(result)).to.be.true;
    })

    it("Manager should insert a new User in the DB", async function () {
        const mockUser = {
            first_name: "Usuario",
            last_name: "Test",
            email: "test@unitario.com",
            password: "123"
        }

        const result = await this.userDao.create(mockUser)
        expect(result).to.have.property("_id");
    })

    describe("Utils Testing", function () {
        describe("bcrypt Hash's tools testing", function () {

            it("createHash function should perform an effective hashing.", async function () {
                const hasher = new Hasher();
                const testPass = "123";
                const hashedPass = await hasher.createHash(testPass);
                expect(/^[$]2[abxy]?[$](?:0[4-9]|[12][0-9]|3[01])[$][./0-9a-zA-Z]{53}$/.test(hashedPass)).to.be.equal(true);
            })

            it("validatePassword function must compare successfully both password", async function() {
                
                const hasher = new Hasher();
                const testPass = "123";
                const hashedPass = await hasher.createHash(testPass);
                expect(await hasher.validatePassword(testPass, hashedPass)).to.be.ok.and.to.be.true;

            })

        })

        describe("DTO testing", function(){
            
            describe("Users DTO Testing", function(){

                it("should unify name and last_name in a single variable", function(){

                    const cart = {
                        _id:"sdfasd23423f",
                        products:[]
                    }
                    const _id = "12312";

                    const mockUser = {
                        _id : _id,
                        first_name: "Usuario",
                        last_name: "Test",
                        email: "test@unitario.com",
                        password: "123",
                        cartId:cart._id,
                        productsOnCart:cart.products.length
                    }

                    const publicUser = UserDTO.getPublicUser(mockUser);
                    
                    expect(publicUser.name).to.be.equal(mockUser.first_name + " " + mockUser.last_name);
                    
                })
            })

        })

    })

})

