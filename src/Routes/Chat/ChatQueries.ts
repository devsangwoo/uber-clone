import { gql } from "apollo-boost";

export const GET_CHAT_BY_ID = gql`
	query GetChatById($chatId: Int!) {
		GetChatById(chatId: $chatId) {
			res
			error
			chat {
				messages {
					userId
					text
				}
				rideId
			}
		}
	}
`;

// type Subscription {
// 	MessageSubscription: Message
// }

export const MESSAGE_SUBSCRIPTION = gql`
	subscription MessageSubscription {
		MessageSubscription {
			text
			userId
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation SendMessage($chatId: Int!, $text: String!) {
		SendChatMessage(chatId: $chatId, text: $text) {
			res
			error
			message {
				text
				userId
			}
		}
	}
`;
