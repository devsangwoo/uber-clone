import { DRIVER_UPDATE } from "../../../constants";
import User from "../../../entities/User";
import {
	ReportMovementMutationArgs,
	ReportMovementResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { clearNullValue } from "../../../utils/clearNullValue";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		ReportMovement: authResolverProtector(
			async (
				_,
				args: ReportMovementMutationArgs,
				{ req, pubSub }
			): Promise<ReportMovementResponse> => {
				const user: User = req.user;
				const notNullArgs: any = clearNullValue(args);
				try {
					await User.update({ id: user.id }, { ...notNullArgs });
					const updatedUser = await User.findOne({ id: user.id });
					pubSub.publish(DRIVER_UPDATE, {
						DriverSubscription: updatedUser
					});
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
