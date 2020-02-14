"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Chat_1 = __importDefault(require("./entities/Chat"));
var Message_1 = __importDefault(require("./entities/Message"));
var Place_1 = __importDefault(require("./entities/Place"));
var Ride_1 = __importDefault(require("./entities/Ride"));
var User_1 = __importDefault(require("./entities/User"));
var Verification_1 = __importDefault(require("./entities/Verification"));
var ConnectionOptions = {
    type: "postgres",
    database: process.env.DB_NAME || "nuber",
    synchronize: true,
    entities: [Chat_1.default, Message_1.default, Place_1.default, Ride_1.default, User_1.default, Verification_1.default],
    logging: false,
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};
exports.default = ConnectionOptions;
//# sourceMappingURL=ormConfig.js.map