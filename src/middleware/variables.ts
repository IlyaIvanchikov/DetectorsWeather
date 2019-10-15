import { Request, Response } from "express";

const constMiddleware = (req, res, next) => {
    res.locals.isAuth = req.session.isAuthenticated;

    next();
};

export default constMiddleware;