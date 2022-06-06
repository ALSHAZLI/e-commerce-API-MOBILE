let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/api/login");
       // return res.redirect("/router/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        // return res.send("home page");
         return res.redirect("/api/profile");
    }
    next();
};

let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        //return res.send("loginnnn  page");
         return res.redirect("/api/login");
    });
};

module.exports = {
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};