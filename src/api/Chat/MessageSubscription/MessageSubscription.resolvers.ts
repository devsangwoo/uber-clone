import { withFilter } from "graphql-yoga";
import { SEND_MESSAGE } from "../../../constants";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";

const resolvers = {
	Subscription: {
		MessageSubscription: {
			subscribe: withFilter(
				(_, __, { pubSub }) => {
					return pubSub.asyncIterator(SEND_MESSAGE);
				},
				async (payload, _, { context }) => {
					const user: User = context.currentUser;
					const message: Message = payload.MessageSubscription;
					try {
						const { chatId } = message;
						const chat = await Chat.findOne({ id: chatId });
						if (chat) {
							return (
								chat.driverId === user.id ||
								chat.passengerId === user.id
							);
						}
						return false;
					} catch (error) {
						return false;
					}
				}
			)
		}
	}
};

export default resolvers;
