import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


//Cookie Parser:
export const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {

        token = req.cookies["authToken"]
    }
    return token;
}

// Express Static:
const __filename = fileURLToPath(import.meta.url);
export const __src = dirname(dirname(__filename))
export const __root = dirname(dirname(dirname(__filename)));


//Token Generator:
export class JwtService {

    constructor() {
        this.secret = "jwtS3cret";
    }

    generateToken = (user) => {
        const token = jwt.sign({ user }, this.secret, { expiresIn: "1h" });
        return token;
    }

    verify = (token) => {
        jwt.verify(token, this.secret, (error, credentials) => {
            if (error) return resizeBy.status(401).send({ error: "Token inválido" });
            return credentials.user;
        })
    }

}


//bCrypt
export class Hasher {
    createHash = async (password) => {
        const salts = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salts);
    }

    validatePassword = (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }
}

