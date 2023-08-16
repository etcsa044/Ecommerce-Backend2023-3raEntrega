import winston, { format } from 'winston';

export default class LoggerService {
    constructor(env) {

        this.options = {
            levels: {
                fatal: 0,
                error: 1,
                warning: 2,
                http: 3,
                info: 4,
                debug: 5,
            },
            colors: {
                fatal: 'red',
                error: 'magenta',
                warning: 'yellow',
                http: 'green',
                info: 'grey',
                debug: 'blue',
            },
        };

        winston.addColors(this.options.colors);

        this.logger = this.createLogger(env);
    }


    

    createLogger = (env) => {
        switch (env) {
            case "dev":
                return winston.createLogger(
                    {
                        levels: this.options.levels,
                        transports: [
                            new winston.transports.Console({
                                level: "debug",
                            })
                        ],
                        format: format.combine(
                            format.simple(),
                            format.colorize(this.options.colors)
                        )
                    })
            case "prod":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({
                            level: "http"
                        }),
                        new winston.transports.File({
                            level: "warning",
                            filename: './errors.log'
                        })
                    ]
                })
        }
    }

   /*  winston.format.printf((msg) =>
                  colorizer.colorize(
                    msg.level,
                    `${msg.timestamp} - ${msg.level}: ${msg.message}`
                  )
                ) */

    
}