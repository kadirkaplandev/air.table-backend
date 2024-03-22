import { Collection, Db, MongoClient } from "mongodb";
import { Request, Response, NextFunction, ErrorRequestHandler, Handler } from "express";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();
export type EnvironmentType = "development" | "production";
export interface ConfigType {
  config: EnvironmentType;
  root: string;
  port: Number | String
  db: string;
  accessControlAllowOrigin: string;
}

export interface AppContextType {
  config: ConfigType;
  userCollection:Collection,
  mongoDb: Db;
  mongoDbConnection: MongoClient;
  closeConnections: () => Promise<void>;
}



