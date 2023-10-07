import cluster from 'cluster'
import { cpus } from 'os';
import express from "express";
import handlebars from "express-handlebars";
import initializePassportStrategies from "./config/passport/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { __src, __root } from "./utils/utils.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import SessionRouter from "./routes/sessions.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import ProductRouter from "./routes/products.routes.js";
import CartRouter from "./routes/cart.routes.js";
import config from './config.js';
import MongoSingleton from "./config/mongo/singleton.config.js";
import TicketRouter from "./routes/ticket.routes.js";


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "E-commerce", 
            description: "Back End project for Coder's Full Stack Developer career. By Carlos Pelayes. 2023."
        }
    },
    apis: [`${__src}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);


const processorsQuantity = cpus().length;
if(cluster.isPrimary){
    console.log('Primary Process')
    for(let i = 0; i < 4 ; i++){
        cluster.fork()
    }
    cluster.on("exit", worker=>{
        cluster.fork();
    })
}else{
    console.log(`Worker Process id number ${process.pid}`);
    //CREACION SERVER:
    const app = express();
    const PORT = config.app.PORT;
    const server = app.listen(PORT, () => { console.log(`listening on PORT ${PORT}`) });



// Instancias Router:
const cartRouter = new CartRouter()
const productRouter = new ProductRouter();
const sessionRouter = new SessionRouter();
const ticketRouter = new TicketRouter()
const viewsRouter = new ViewsRouter();

//CONECCION A LA DB
const mongoInstance = MongoSingleton;
mongoInstance.getInstance();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__src}/public`));

//SWAGGER:
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// HANDLEBARS CONFIGURATION:
app.engine("handlebars", handlebars.engine());
app.set("views", `${__src}/views`);
app.set("view engine", "handlebars");
const hbars = handlebars.create({});
hbars.handlebars.registerHelper("eq", function(a, b){
    return a === b;
})

// Passport:
app.use(passport.initialize());
initializePassportStrategies();

// Routes:
app.use("/", viewsRouter.getRouter());
app.use("/api/carts", cartRouter.getRouter());
app.use("/api/products", productRouter.getRouter());
app.use("/api/tickets", ticketRouter.getRouter());
app.use("/api/sessions", sessionRouter.getRouter());
}