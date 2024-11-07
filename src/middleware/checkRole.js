function checkRole(role) {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            return next();
        }
        return res.redirect('/login');  
    };
}
