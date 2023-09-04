import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Integrated Testing', function () {
    this.timeout(5000);
    describe('Users Test', function () {
        it('POST endpoint api/sessions should create a new User in the DB', async function () {

            const mockUser = {
                first_name: "Usuario",
                last_name: "SuperTest",
                email: "test@integracion2.com",
                password: "123"
            }
            
            const response = await requester.post('/api/sessions/register').send(mockUser);
            const {status, _body} = response;
            console.log(response)
            expect(status).to.be.equal(200)
            expect(_body.payload._id).to.be.ok;
        })
    })
})