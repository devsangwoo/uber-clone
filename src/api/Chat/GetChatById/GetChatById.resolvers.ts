import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import {
	GetChatByIdQueryArgs,
	GetChatByIdResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Query: {
		GetChatById: authResolverProtector(
			async (
				_,
				args: GetChatByIdQueryArgs,
				{ req }
			): Promise<GetChatByIdResponse> => {
				const user: User = req.user;

				try {
					const chat = await Chat.findOne(
						{
							id: args.chatId
						},
						{ relations: ["messages"] }
					);

					if (chat) {
						if (
							chat.passengerId === user.id ||
							chat.driverId === user.id
						) {
							return {
								res: true,
								error: null,
								chat
							};
						}
						return {
							res: false,
							error: "Not authrorized to see this chat",
							chat: null
						};
					} else {
						return {
							res: false,
							error: "Not Found",
							chat: null
						};
					}
				} catch (error) {
					return {
						res: false,
						error: error.message,
						chat: null
					};
				}
			}
		)
	}
};

export default resolvers;
