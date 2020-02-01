import { gql } from "apollo-boost";

export const GET_CHAT_BY_ID = gql`
	query GetChatById($chatId: Int!) {
		GetChatById(chatId: $chatId) {
			res
			error
			chat {
				messages {
					id
					userId
					text
				}
				rideId
			}
		}
	}
`;

export const MESSAGE_SUBSCRIPTION = gql`
	subscription MessageSubscription {
		MessageSubscription {
			id
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
				id
				text
				userId
			}
		}
	}
`;
