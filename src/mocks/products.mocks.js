import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.product(),
        code: faker.string.alphanumeric({ length: 6, casing: 'upper'}),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 0, max: 500 })
    }
}