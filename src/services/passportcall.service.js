import passport from "passport";


export const passportCall = (strategy, options = {}) => {

    return async (req, res, next) => {
        
        passport.authenticate(
            strategy,
            (error, user, info) => {
            if (error) return next(error);
            if (!options.strategyType) {
                console.log(`Route ${req.url} doesn't have defined a strategyType`);
                return res.sendServerError();
            }

            if (!user) {
                switch (options.strategyType) {
                    case "jwt":
                        req.error = info.message ? info.message : info.toString();
                        return next();
                    case "locals":
                        return res.sendUnauthorized(info.message ? info.message : info.toString());
                }
            }

            if (!user) return res.sendUnauthorized(info.message ? info.message : info.toString());
            req.user = user;
            next()           
            
        })(req, res, next);
    }
}