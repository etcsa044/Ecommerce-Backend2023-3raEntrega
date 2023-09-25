

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
            cartId: cart._id,
            productsOnCart: cart.products.length
        };
    }

    static getPublicUsers(users) {
        const publicUsers = [];
        users.map(user => {
            const { _id, first_name, last_name, email, role, cart, last_connection } = user;
            const id = _id;
            const name = `${first_name} ${last_name}`;

            const publicUser = {
                id,
                name,
                email,
                role,
                cartId: cart._id,
                productsOnCart: cart.products.length,
                last_connection: last_connection || "N/A"
            }

            publicUsers.push(publicUser)

        })

        return publicUsers;
    }

    static restoreToken(user) {
        return {
            user: user.email
        };
    };

}

