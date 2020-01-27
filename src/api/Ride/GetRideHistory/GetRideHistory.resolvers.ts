import User from "../../../entities/User";
import {
	GetRideHistoryQueryArgs,
	GetRideHistoryResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		GetRideHistory: async (
			_,
			args: GetRideHistoryQueryArgs,
			{ req }
		): Promise<GetRideHistoryResponse> => {
			const user: User = req.user;
			const {isDriver, paging} = args;
			try {
				const userWithRideHistroy = await User.findOne(
					{ id: user.id },
					{ relations: [isDriver ? "rideAsDriver" : "rideAsPassenger" ]}
				);
				if (userWithRideHistroy) {
					const rides = isDriver? user.rideAsDriver : user.rideAsPassenger;

					return {
						res: true,
						error: null,
						rides: rides.slice(0, Math.min(paging * 5, rides.length))
					};
				} else {
					return {
						res: false,
						error: "user not existed",
						rides: null
					};
				}
			} catch (error) {
				return {
					res: false,
					error: error.message,
					rides: null
				};
			}
		}
	}
};

export default resolvers;
