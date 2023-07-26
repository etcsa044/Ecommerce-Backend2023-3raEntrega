import {faker} from '@faker-js/faker';

export const generateUser = () => {
    return {
        first_name : faker.person.firstName(),
        last_name : faker.person.lastName(),
        email : faker.internet.email(),
        password : "123",
    }
}