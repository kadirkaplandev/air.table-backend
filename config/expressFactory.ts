import { Server } from "http";
import express, { NextFunction, Request, response, Response, Express } from "express";
import swaggerUi from "swagger-ui-express";
import { AppContextType } from "../src/types/configTypes";


export interface AirTableExpressServer {
	httpServer: Server;
	app: Express;
}

export default async (appContext: AppContextType): Promise<AirTableExpressServer> => {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// headers
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
		res.header(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, Content-Length, X-Requested-With"
		);
		res.setHeader("Access-Control-Allow-Credentials", "true");

		if ("OPTIONS" === req.method) {
			res.sendStatus(200);
		} else {
			next();
		}
	});

	app.use(
		"/api",
		require("../src/controllers/user")(appContext)
	);


	// if (appContext.config.config !== "production")
	// 	app.use("/api-docs", swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));

	//response handler, if no middleware handles
	app.use((req, res) => {
		res.status(404).send({ message: "Not Found!", success: false });
	});

	return new Promise((resolve) => {
		const httpServer = app.listen(process.env.PORT, () => {
			console.log("Server started on port: " + process.env.PORT);
			resolve({ httpServer, app });
		});
	});
};
