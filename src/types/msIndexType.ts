import { Collection, Db, MongoClient } from "mongodb";

export interface MSIndexType {
  name: string
}



export interface AddDocumentsType {
    documents: Array<string> | any,
    index: string
}