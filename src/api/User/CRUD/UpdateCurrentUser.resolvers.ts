import User from "../../../entities/User";
import {
	UpdateCurrentUserMutationArgs,
	UpdateCurrentUserRespone
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { clearNullValue } from "../../../utils/clearNullValue";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		UpdateCurrentUser: authResolverProtector(
			async (
				_,
				args: UpdateCurrentUserMutationArgs,
				{ req }
			): Promise<UpdateCurrentUserRespone> => {
				const user: User = req.user;
				const notNullArgs: any = clearNullValue(args);
				try {
					if (notNullArgs.password) {
						user.password = notNullArgs.password;
						await user.save();
						delete notNullArgs.password;
					}
					if (notNullArgs.email && notNullArgs.email !== user.email) {
						notNullArgs.verifiedEmail = false;
						// original verfication should be deleted?
					}
					if (
						notNullArgs.phoneNumber &&
						notNullArgs.phoneNumber !== user.phoneNumber
					) {
						notNullArgs.verifiedPhoneNumber = false;
						// original verfication should be deleted?
					}
					console.log(notNullArgs);
					await User.update({ id: user.id }, { ...notNullArgs });
					return {
						res: true,
						error: null
					};
				} catch (error) {
					return {
						res: false,
						error: error.message
					};
				}
			}
		)
	}
};

export default resolvers;
