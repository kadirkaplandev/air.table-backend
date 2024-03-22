import { MongoClient, CreateCollectionOptions, Db, MongoError } from "mongodb";
import { AppContextType, ConfigType } from "../src/types/configTypes";
import userValidator from "../src/models/user";



const options = {
	keepAlive: true,
	useNewUrlParser: true
};

export default async (config: ConfigType): Promise<AppContextType> => {
	const mongoDbConnection = await MongoClient.connect(config.db);
	const mongoDb = mongoDbConnection.db();

	const userCollection = await ensureCollection(mongoDb, "user", {
		validator: userValidator
	});

	return {
		config,
		userCollection,
		mongoDb,
		mongoDbConnection,
		closeConnections: async () => {
			await Promise.all([
				mongoDbConnection.close(),
			]);
			return;
		}
	};
};

async function ensureCollection(
	db: Db,
	collectionName: string,
	collectionOptions: CreateCollectionOptions
) {
	try {
		return await db.createCollection(collectionName, collectionOptions);
	} catch (err) {
		const typedError = err as MongoError;
		if (typedError.code !== 48) throw err;
		return db.collection(collectionName);
	}
}
