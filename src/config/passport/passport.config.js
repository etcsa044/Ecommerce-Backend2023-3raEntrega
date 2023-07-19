import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import local from "passport-local";
import { Hasher } from "../../utils/utils.js";
import { cartManager, userManager } from "../../../dao/mongo/managers/index.js";
import { cookieExtractor } from "../../utils/utils.js";
import config from "../../config.js";
import loginDTO from "../../dtos/user.dto.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;
const hasher = new Hasher();

const initializePassportStrategies = () => {


    // Estrategia de Registro: Register
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
        
        try {
            
            
            const { first_name, last_name } = req.body;

            if (!first_name || !last_name || !email || !password) return done(null, false, { status: "Error", error: "Debe completar todos los campos" });
            let user = await userManager.getBy({email});

            if (user) return done(null, false, { message: "El email ya se encuentra registrado" });
            const hashedPassword = await hasher.createHash(password);
            
            const cart = await cartManager.create();

            user = {
                first_name,
                last_name,
                email,
                cart:cart._id,
                password: hashedPassword
            }

            const result = userManager.create(user);

            return done(null, result, { message: "Usuario creado correctamente." });

        } catch (error) {
            return done(error)
        }
    }));// Fin Register


    // Estrategia de Logueo: Login
    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {

        let userDB;

        try {
            if (email === config.admin.user && password === config.admin.password) {
                const user = {
                    id: 0,
                    name: `SuperAdmin`,
                    email: "...",
                    role: "ADMIN"
                }
                return done(null, user);
            };

            userDB = await userManager.getBy({email});

            if (!userDB) return done(null, false, { message: "Credenciales Incorrectas" });

            const isValidPassword = await hasher.validatePassword(password, userDB.password);

            if (!isValidPassword) return done(null, false, { message: "Credenciales Incorrectas" });

            //DTO
            const user = new loginDTO(userDB);
            
            return done(null, user);

        } catch (error) {

            return done(error);
        }

    })); //fin Login

    //Estrategia de Token: JWT
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), // dan usuario
        secretOrKey: "jwtS3cret"
    }, async (payload, done) => {
        try {
            return done(null, payload);
        } catch (error) {
            return done(error);
        }
    })) //fin JWT.
}

export default initializePassportStrategies;