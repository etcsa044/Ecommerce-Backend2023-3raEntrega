import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program.option('-m, --mode <mode>', 'execution mode', "prod")
program.parse();
dotenv.config({
    path: program.opts().mode === "dev"?'./.env.dev':'./.env.prod'
});

export default {
    app:{
        PORT: process.env.PORT||8080,
    },
    mongo:{
        URL:process.env.DB||'localhost:27017'
    },
    admin:{
        user:process.env.USER,
        password: process.env.PASSWORD
    },
    logger:{
        MODE: process.env.LOGGER_MODE
    },
    mailer:{
        USER: process.env.MAILER_USER,
        PASSWORD: process.env.MAILER_PASSWORD
    }


}