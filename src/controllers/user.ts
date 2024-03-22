"use-strict";
import express, { Request, Response, NextFunction } from "express";
import { AppContextType } from "../types/configTypes";



module.exports = (appContext: AppContextType) => {
    const router = express.Router();
    router.get(
        "/*",
        async (req: any, res: Response, _next: NextFunction) => {
            try {
                res.status(200).send('hello world');   
            } catch (err) {
                _next({ success: false, message: (err as Error).message });
            }
        }
    );
    
    router.use((err: any, req: Request, response: Response, next: NextFunction) => {
        if (err.success === false) {
            response.status(400).send(err);
        } else {
            response.status(400).send({ success: false, message: err });
        }
    });
    return router;
};
