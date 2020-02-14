import cors from "cors";
import express from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import { X_JWT } from "./constants";
import schema from "./schema";
import { verifyJWT } from "./utils/JWT";
import passport from "./utils/passport";

class App {
	public app: GraphQLServer;
	public pubSub: any;

	constructor() {
		this.pubSub = new PubSub();
		this.pubSub.ee.setMaxListeners(99); // only for dev, b/c of memory leak
		this.app = new GraphQLServer({
			schema,
			context: req => {
				const { connection: { context = null } = {} } = req;
				return {
					req: req.request,
					pubSub: this.pubSub,
					context
				};
			}
		});
		this.middlewares();
		const url =
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: "https://project-ninstagram.herokuapp.com";

		this.app.get("/api/auth/facebook", passport.authenticate("facebook"));

		this.app.get(
			"/api/auth/facebook/callback",
			passport.authenticate("facebook", {
				session: false
			}),
			(req, res) => {
				res.redirect(`${url}/auth/${req.authInfo}`);
			}
		);

		this.app.get("/api/auth/google", passport.authenticate("google"));

		this.app.get(
			"/api/auth/google/callback",
			passport.authenticate("google", {
				session: false,
				failureRedirect: "/api/auth/google"
			}),
			(req, res) => {
				res.redirect(`${url}/auth/${req.authInfo}`);
			}
		);
		this.app.get("*", (req, res) => {
			res.sendFile(path.join(__dirname + "/client/build/index.html"));
		});
	}

	// Anything that doesn't match the above, send back index.html

	private middlewares = (): void => {
		this.app.express.use(cors());
		this.app.express.use(logger("dev"));
		this.app.express.use(helmet());
		this.app.express.use(this.jwt);
		this.app.express.use(
			express.static(path.join(__dirname, "client/build"))
		);
	};

	// custum middle ware verify jwt
	private jwt = async (req, res, next): Promise<void> => {
		const token = req.get(X_JWT);
		if (token) {
			const user = await verifyJWT(token);
			req.user = user;
		}
		next();
	};
}

export default new App().app;
