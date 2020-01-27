import { Between } from "typeorm";
import { RANGE_0_5 } from "../../../constants";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Query: {
		GetNearbyDrivers: authResolverProtector(
			async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
				const user: User = req.user;
				const { lastLng, lastLat } = user;
				try {
					const drivers: User[] = await User.find({
						isDriving: true,
						lastLng: Between(
							lastLng - RANGE_0_5,
							lastLng + RANGE_0_5
						),
						lastLat: Between(
							lastLat - RANGE_0_5,
							lastLat + RANGE_0_5
						)
					});
					return {
						res: true,
						error: null,
						drivers
					};
				} catch (error) {
					return {
						res: false,
						error: error.message,
						drivers: null
					};
				}
			}
		)
	}
};

export default resolvers;
