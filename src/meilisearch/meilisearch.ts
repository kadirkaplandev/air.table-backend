import { MSIndexType, AddDocumentsType } from "../../src/types/msIndexType"

import * as fs from 'fs';
import * as dotenv from 'dotenv'
dotenv.config()

import { MeiliSearch } from 'meilisearch';

const axios = require('axios').default;

const start = async () => {
    return new MeiliSearch({
        host: process.env.MS_HOST as string | any,
        apiKey: process.env.MS_API_KEY,
    })
}
const createIndex = async (name: string) => {
    try {
        const msClient = await start();
        return msClient.index(name);
    } catch (error) {
        throw error
    }
}
const addDocuments = async (params: AddDocumentsType) => {
    try {
        const { documents, index } = params
        const createdIndex = await createIndex(index);
        let response = await createdIndex.addDocuments(documents);
        return response;
    } catch (error) {
        throw error
    }

}
const search = async (text: any) => {
    try {
        console.log('searching for', text)
        const index = await createIndex('cars')
        const searchresponse = await index.search(text)
        return searchresponse
    } catch (error) {
        throw error
    }
}
export default { addDocuments, createIndex, start, search } 
