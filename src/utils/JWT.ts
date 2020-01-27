import jwt from "jsonwebtoken";
import User from "../entities/User";

export const createJWT = (id: number): string => {
	const token = jwt.sign({ id }, process.env.JWT_TOKEN || "");
	return token;
};

export const verifyJWT = async (token: string): Promise<User | undefined> => {
	try {
		const verifiedToken: any = jwt.verify(
			token,
			process.env.JWT_TOKEN || ""
		);
		if (verifiedToken && verifiedToken.id) {
			const { id } = verifiedToken;
			const user = User.findOne(
				{ id },
				{ relations: ["rideAsDriver", "rideAsPassenger"] }
			);
			return user;
		}
		return undefined;
	} catch (error) {
		return undefined;
	}
};
