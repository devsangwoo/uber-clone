import express from "express";
import path from "path";

export default (app: express.Express) => {
	if (process.env.NODE_ENV === "production") {
		app.use(express.static(path.join(__dirname, "client/build")));

		app.get("/*", (req, res) => {
			res.sendFile(path.join(__dirname, "../client/build/index.html"));
		});
	}
};
