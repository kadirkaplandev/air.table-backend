import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

const defaults = {
  root: path.normalize(__dirname + "/.."),
  port: process.env.PORT,
};

const development = {
  root: path.normalize(__dirname + "/.."),
  port: process.env.PORT,
  db: "mongodb://localhost:27017/airtable",
  accessControlAllowOrigin: "*",
  config: "development",
};


const production = {
  root: path.normalize(__dirname + "/.."),
  port: process.env.PORT,
  db: "",
  accessControlAllowOrigin: "*",
  config: "production",
};


const test = {
  root: path.normalize(__dirname + "/.."),
  port: process.env.PORT,
  db: "",
  accessControlAllowOrigin: "*",
  config: "test",
};

const config = (environment: "development" | "test"| "production"= "development", mongoDbUri?: string) => {
  const selectedConfig = {
    development,
    test,
    production,
  }[environment];
  if(mongoDbUri)
    selectedConfig!.db = mongoDbUri;
  return selectedConfig;

};

export default config;
