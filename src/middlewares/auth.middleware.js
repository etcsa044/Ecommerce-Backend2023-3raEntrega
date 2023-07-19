

export const privacy = (privacyType) => {
    return (req, res, next) => {

        const user = null;
        
        switch (privacyType) {
            case "PRIVATE":
                if(user) next();
                else res.redirect("/login");
                break;
            case "NO_AUTHENTICATED":
                if(!user) next();
                else res.redirect("/index");
                break;
        }   
    }
}