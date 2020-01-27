import User from "../../../entities/User";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		ToggleDrivingMode: authResolverProtector(
			async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
				const user: User = req.user;
				user.isDriving = !user.isDriving;
				user.save();
				return {
					res: true,
					error: null
				};
			}
		)
	}
};

export default resolvers;
