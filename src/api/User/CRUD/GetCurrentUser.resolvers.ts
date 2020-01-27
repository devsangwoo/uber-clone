import User from "../../../entities/User";
import { GetCurrentUserResponse } from "../../../types/graph";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers = {
	Query: {
		GetCurrentUser: authResolverProtector(
			async (_, __, { req }): Promise<GetCurrentUserResponse> => {
				const user: User = req.user;
				return {
					res: true,
					error: null,
					user
				};
			}
		)
	}
};

export default resolvers;
