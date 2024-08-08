"use-strict";
import express, { Request, Response, NextFunction } from "express";
import { AppContextType } from "../types/configTypes";
import * as fs from 'fs';

import { MeiliSearch } from 'meilisearch';
const axios = require('axios').default;


module.exports = (appContext: AppContextType) => {


    const router = express.Router();
    router.get(
        "/*",
        async (req: any, res: Response, _next: NextFunction) => {
            try {
                const data = await meiliSearch();
                res.status(200).send(Object.assign({ 'title': 'Hello World!' }, { data }));
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

const meiliSearch = async () => {
    const movies = await axios.get('https://dummyapi.online/api/movies')
    const client = new MeiliSearch({
        host: 'https://ms-51a8eeca0be8-10578.lon.meilisearch.io',
        apiKey: '71b692ce2cae9be3c2bbc53bf7a58ac7435aea93',
    })
    const index = client.index('movies');
    client.deleteIndex('job')
    const documents = [
        { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
        { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
        { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
        { id: 4, title: 'Mad Max: Fury Road', genres: ['Adventure', 'Science Fiction'] },
        { id: 5, title: 'Moana', genres: ['Fantasy', 'Action'] },
        { id: 6, title: 'Philadelphia', genres: ['Drama'] },

    ]
    

    let response = await index.addDocuments(documents)
    console.log('meilisearch çalıştı')
    console.log(response) // => { "uid": 0 }
    return response
}
