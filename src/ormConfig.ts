import { ConnectionOptions } from "typeorm";
import Chat from "./entities/Chat";
import Message from "./entities/Message";
import Place from "./entities/Place";
import Ride from "./entities/Ride";
import User from "./entities/User";
import Verification from "./entities/Verification";

const ConnectionOptions: ConnectionOptions = {
	type: "postgres",
	database: process.env.DB_NAME || "nuber",
	synchronize: true,
	entities: [Chat, Message, Place, Ride, User, Verification],
	logging: false,
	host: process.env.DB_ENDPOINT,
	port: 5432,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
};

export default ConnectionOptions;
