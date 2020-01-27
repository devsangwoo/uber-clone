import User from "../../../entities/User";
import {
	GetUserByIdQueryArgs,
	GetUserByIdResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		GetUserById: async (
			_,
			args: GetUserByIdQueryArgs
		): Promise<GetUserByIdResponse> => {
			try {
				const user = await User.findOne({ id: args.userId });
				if (user) {
					return {
						res: true,
						error: null,
						user
					};
				} else {
					return {
						res: false,
						error: "non existed user",
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
		}
	}
};

export default resolvers;
