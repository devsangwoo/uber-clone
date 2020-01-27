import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		AddPlace: authResolverProtector(
			async (
				_,
				args: AddPlaceMutationArgs,
				{ req }
			): Promise<AddPlaceResponse> => {
				const user: User = req.user;
				try {
					await Place.create({ ...args, user }).save();
					// user.places.push(place);
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
