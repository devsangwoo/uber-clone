import Place from "../../../entities/Place";
import User from "../../../entities/User";
import {
	DeletePlaceMutationArgs,
	DeletePlaceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		DeletePlace: authResolverProtector(
			async (
				_,
				args: DeletePlaceMutationArgs,
				{ req }
			): Promise<DeletePlaceResponse> => {
				const user: User = req.user;
				try {
					const place = await Place.findOne({ id: args.id });
					if (place) {
						if (place.userId === user.id) {
							place.remove();
							return {
								res: true,
								error: null
							};
						} else {
							return {
								res: false,
								error: "Not authorized"
							};
						}
					} else {
						return {
							res: false,
							error: "Place not found"
						};
					}
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
