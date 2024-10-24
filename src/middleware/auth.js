const checkAuth =(req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

export default checkAuth;
