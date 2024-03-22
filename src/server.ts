import configFactory from "../config/configFactory";
import appContextFactory from "../config/appContextFactory";
import expressFactory from "../config/expressFactory";
import { EnvironmentType, ConfigType, AppContextType } from "./types/configTypes";


const config = configFactory(process.env.NODE_ENV as EnvironmentType);


console.info(
  `express httpserver will be started with config: ${JSON.stringify(
    config,
    undefined,
    "\t"
  )}`
);

export default appContextFactory(config as ConfigType).then(async (appContext: AppContextType) => {
  await expressFactory(appContext);
  console.info("express httpserver started")
}).catch((err:any)=>{
  console.log("error in application context creation")
  console.log(err)
  process.exit(-1)
});




