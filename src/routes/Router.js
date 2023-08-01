import cluster from 'cluster'
import { cpus } from 'os';
import { Router } from "express";
import { passportCall } from "../services/passportcall.service.js";
import LoggerService from "../services/logger.service.js";
import config from "../config.js";


export default class BaseRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() { };

    getRouter = () => this.router;


    get(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.attachLogger,
            this.generateCustomResponses,
            passportCall("jwt", { strategyType: "jwt" }),
            this.handlePolicies(policies),
            this.applyCallbacks(callbacks),
            this.errorHandler
        );
    }


    post(path, policies, ...callbacks) {
        this.router.post(
            path,
            this.attachLogger,
            this.generateCustomResponses,
            passportCall("jwt", { strategyType: "jwt" }),
            this.handlePolicies(policies),
            this.applyCallbacks(callbacks),
            this.errorHandler
        );
    }
    put(path, policies, ...callbacks) {
        this.router.put(path,
            this.attachLogger,
            this.generateCustomResponses,
            passportCall("jwt", { strategyType: "jwt" }),
            this.handlePolicies(policies),
            this.applyCallbacks(callbacks),
            this.errorHandler
        );
    }
    delete(path, policies, ...callbacks) {
        this.router.delete(path,
            this.attachLogger,
            this.generateCustomResponses,
            passportCall("jwt", { strategyType: "jwt" }),
            this.handlePolicies(policies),
            this.applyCallbacks(callbacks),
            this.errorHandler
        );
    }


    // Middleware Custom Responses: 
    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = message => res.send({ status: "success", message });
        res.sendSuccessWithPayload = payload => res.send({ status: "success", payload });
        res.sendInternalError = error => res.status(500).send({ status: "error", error: error.toString() });
        res.sendIncompletesValues = error => res.status(400).send({ status: "error", message: "The fields are all required", error: error });
        res.sendNotFound = (error, message) => res.status(400).send({ status: "error", message: message || "No Results - Please verify the entered data.", error: error });
        res.sendUnauthorized = error => res.status(400).send({ status: "error", error });
        next();
    }


    //Errors Middleware

    errorHandler = (error, req, res, next) => {
        res.status(error.status);
        console.log(error);
        next()
    }

    //Loguer Service:    
    attachLogger = (req, res, next) => {
        const logger = new LoggerService(config.logger.MODE);
        req.logger = logger.logger;
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} processed by ${process.pid}`);
        next();
    }


    // Handle Policies:
    handlePolicies = policies => {
        return (req, res, next) => {
            if (policies[0] === "PUBLIC") return next();
            let user = req.user;
            if (policies[0] === "NO_AUTH" && user) return res.status(401).send({ status: "error", error: "Unauthorized" });
            if (policies[0] === "NO_AUTH" && !user) return next();
            if (!user) return res.status(401).send({ status: "error", error: req.error });
            if (!policies.includes(user.user.role.toUpperCase())) return res.status(403).send({ status: "error", error: "Forbidden" });
            next();
        }
    };


    // Funcion que retorna los callbacks aplicados para los metodos GET, POST, PUT, DELETE.
    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                params[1].sendInternalError(error); //params[1]: hace referencia a el 2do parametro recibido que siempre es RES [req, res, next]
            }
        })
    }



}