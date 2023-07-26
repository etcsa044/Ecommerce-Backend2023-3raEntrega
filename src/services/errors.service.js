import { th } from "@faker-js/faker";


export default class ErrorService {
    static createError({ name = 'Error', cause, message, code = 1, status = 500 }) {
        const error = new Error(message);
        error.name = name;
        error.cause = cause,
        error.code = code;
        error.status = status
        throw error;
    };
}