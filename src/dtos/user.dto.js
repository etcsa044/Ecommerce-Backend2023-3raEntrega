

export default class UserDTO {

    static getPublicUser(user) {
        const { _id, first_name, last_name, email, role, cart } = user;
        const id = _id;
        const name = `${first_name} ${last_name}`;

        return user = {
            id,
            name,
            email,
            role,
            cartId :cart._id,
            productsOnCart : cart.products.length
        };
    }
    
}

