import User from "../../../entities/User";
import { GetUserWithRideHistoryResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		GetUserWithRideHistory: async (
			_,
			__,
			{ req }
		): Promise<GetUserWithRideHistoryResponse> => {
			const user: User = req.user;

			try {
				const userWithRideHistroy = await User.findOne(
					{ id: user.id },
					{ relations: ["rideAsPassenger", "rideAsDriver"] }
				);
				if (userWithRideHistroy) {
					return {
						res: true,
						error: null,
						user: userWithRideHistroy
					};
				} else {
					return {
						res: false,
						error: "user not existed",
						user: null
					};
				}
			} catch (error) {
				return {
					res: false,
					error: error.message,
					user: null
				};
			}
			return {
				res: true,
				error: null,
				user: null
			};
		}
	}
};

export default resolvers;
