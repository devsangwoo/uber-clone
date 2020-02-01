import { SEND_MESSAGE } from "../../../constants";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import {
	SendChatMessageMutationArgs,
	SendChatMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authResolverProtector } from "../../../utils/resolverProtector";

const resolvers: Resolvers = {
	Mutation: {
		SendChatMessage: authResolverProtector(
			async (
				_,
				args: SendChatMessageMutationArgs,
				{ req, pubSub }
			): Promise<SendChatMessageResponse> => {
				const user: User = req.user;
				const { text, chatId } = args;

				try {
					const chat = await Chat.findOne({ id: chatId });
					if (chat) {
						if (
							chat.passengerId === user.id ||
							chat.driverId === user.id
						) {
							const message = await Message.create({
								text,
								chat,
								user
							}).save();
							pubSub.publish(SEND_MESSAGE, {
								MessageSubscription: message
							});
							return {
								res: true,
								error: null,
								message
							};
						} else {
							return {
								res: false,
								error: "you are not authorized",
								message: null
							};
						}
					} else {
						return {
							res: false,
							error: "chat not existed",
							message: null
						};
					}
				} catch (error) {
					return {
						res: false,
						error: error.message,
						message: null
					};
				}
			}
		)
	}
};

export default resolvers;
