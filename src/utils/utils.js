import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
import Handlebars from "handlebars";
import config from "../config.js";

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
        this.secret = config.jwt.SECRET;
    }

    generateToken = (user) => {
        const token = jwt.sign({ user }, this.secret, { expiresIn: '1d' });
        return token;
    }

    verify = async (token) => {

        try {
            const credentials = await new Promise((res, rej) => {
                jwt.verify(token, this.secret, (error, credentials) => {
                    if (error) return rej(error);
                    res(credentials);
                })
            })
            return credentials.user
        } catch (error) {
            console.log("the token has expired" + error)
            throw new error;
        }
        
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


//Mailing Service

export const generateMailTemplate = async(template, payload) => {
    const content = await fs.promises.readFile(`${__src}/templates/${template}.handlebars`, 'utf-8');
    const precompiledContent = Handlebars.compile(content);
    const compiledContent = precompiledContent({...payload});
    return compiledContent;
}
