import "dotenv/config";

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import {
	GRAPHQL_ENDPOINT,
	PLAYGROUND,
	PORT,
	SUBSCRIPTION_ENDPOINT,
	X_JWT
} from "./constants";
import ConnectionOptions from "./ormConfig";
import { verifyJWT } from "./utils/JWT";

const appOptions: Options = {
	port: PORT,
	playground: PLAYGROUND,
	endpoint: GRAPHQL_ENDPOINT,
	subscriptions: {
		path: SUBSCRIPTION_ENDPOINT,
		onConnect: async connectionParam => {
			const token = connectionParam[X_JWT];
			if (token) {
				const user = await verifyJWT(token);
				return {
					currentUser: user
				};
			}

			throw new Error("No jwt, Can't subscribe");
		}
	}
};

console.log(process.env.NODE_ENV);
createConnection(ConnectionOptions).then(() => {
	app.start(appOptions, () =>
		console.log(`listening on http://localhost:${PORT}`)
	);
});
