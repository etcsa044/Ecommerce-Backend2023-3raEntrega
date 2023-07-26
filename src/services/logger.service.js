import winston from 'winston';
export default class LoggerService {
    constructor(env) {
        this.logger = this.createLogger(env);
        this.options = {
            levels: {
              fatal: 0,
              error: 1,
              warning: 2,
              http: 3,
              info: 4,
              debug: 5,
            },
          //   colors: {
          //     fatal: 'red',
          //     error: 'orange',
          //     warning: 'yellow',
          //     http: 'green',
          //     info: 'grey',
          //     debug: 'blue',
          //   },
          };
    }

    createLogger = (env) => {
        switch(env){
            case "dev":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({level:"info"})
                    ]
                })
            case "prod":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({level:"http"}),
                        new winston.transports.File({level:"warning",filename:'./errors.log'})
                    ]
                })
        }
    }
}