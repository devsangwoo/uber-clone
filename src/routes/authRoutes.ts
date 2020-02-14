import { Express } from "express";
import passport from "../utils/passport";

const url =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://project-ninstagram.herokuapp.com";

export default (app: Express) => {
	app.get("/api/auth/facebook", passport.authenticate("facebook"));

	app.get(
		"/api/auth/facebook/callback",
		passport.authenticate("facebook", {
			session: false
		}),
		(req, res) => {
			res.redirect(`${url}/auth/${req.authInfo}`);
		}
	);

	app.get("/api/auth/google", passport.authenticate("google"));

	app.get(
		"/api/auth/google/callback",
		passport.authenticate("google", {
			session: false,
			failureRedirect: "/api/auth/google"
		}),
		(req, res) => {
			res.redirect(`${url}/auth/${req.authInfo}`);
		}
	);
};
