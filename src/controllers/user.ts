"use-strict";
import express, { Request, Response, NextFunction } from "express";
import { AppContextType } from "../types/configTypes";
import meilisearchService from "../meilisearch/meilisearch"
import * as fs from 'fs';
import * as dotenv from 'dotenv'
dotenv.config()

import { MeiliSearch } from 'meilisearch';
const axios = require('axios').default;

const router = express.Router();
module.exports = (appContext: AppContextType) => {
    router.get(
        "/user",
        async (req: any, res: Response, _next: NextFunction) => {
            try {
                // const data = await meiliSearch();
                res.status(200).send({ 'title': 'Hello World!' });
            } catch (err) {
                _next({ success: false, message: (err as Error).message });
            }
        }
    );
    router.post(
        "/meilisearh/create",
        async (req: any, res: Response, _next: NextFunction) => {
            try {
                const { index, documents } = req.body
                //const createdIndex = await meilisearchService.addDocuments({ documents, index })
               const respons =  await meilisearchService.start()
                res.status(200).send(respons);
            } catch (err) {
                _next({ success: false, message: (err as Error).message });
            }
        }
    );
    router.post(
        "/meilisearch/search",
        async (req: any, res: Response, _next: NextFunction) => {
            try {
                const { text } = req.query
                const createdIndex = await meilisearchService.search(text)
                res.status(200).send(createdIndex);
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


