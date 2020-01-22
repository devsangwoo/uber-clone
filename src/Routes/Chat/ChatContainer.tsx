import { useQuery, useSubscription, useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import Routes from "..";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetChatById,
	GetChatByIdVariables,
	GetCurrentUser,
	SendMessage,
	SendMessageVariables,
	MessageSubscription
} from "../../types/api";
import ChatPresenter from "./ChatPresenter";
import {
	GET_CHAT_BY_ID,
	MESSAGE_SUBSCRIPTION,
	SEND_MESSAGE
} from "./ChatQueries";
import { useInput } from "../../utils/hooks";

interface IRouteParams {
	chatId: string;
}
interface IProps extends RouteComponentProps<IRouteParams> {}

const ChatContainer: React.FC<IProps> = ({ history, location, match }) => {
	const {
		params: { chatId }
	} = match;
	const [rideId, setRideId] = useState<number>(-1);
	const [message, onChangeMessage, setMessage] = useInput("");
	const [messages, setMessages] = useState<any[]>();
	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});

	useQuery<GetChatById, GetChatByIdVariables>(GET_CHAT_BY_ID, {
		onCompleted: ({ GetChatById }) => {
			const { res, error, chat } = GetChatById;
			console.log(res, error, chat);
			if (res && chat && chat.rideId && chat.messages && userData) {
				console.log(chat.rideId);
				setRideId(chat.rideId);
				const messages = chat.messages.map(message => {
					if (message) {
						return {
							...message,
							mine:
								userData.GetCurrentUser.user?.id ===
								message.userId
						};
					}
				});
				setMessages(messages);
			} else {
				console.log(error);
				toast.error(error);
			}
		},
		variables: {
			chatId: parseInt(chatId, 10)
		}
	});

	useSubscription<MessageSubscription>(MESSAGE_SUBSCRIPTION, {
		onSubscriptionComplete: () => {
			console.log("listening new message");
		},
		onSubscriptionData: ({ subscriptionData }) => {
			const { data } = subscriptionData;
			console.log(data);
			if (data && messages && userData) {
				const { MessageSubscription } = data;
				if (MessageSubscription) {
					setMessages([
						...messages,
						{
							...MessageSubscription,
							mine:
								userData.GetCurrentUser.user!.id ===
								MessageSubscription.userId
						}
					]);
					// messages.push({
					// 	...MessageSubscription,
					// 	mine:
					// 		userData.GetCurrentUser.user?.id ===
					// 		MessageSubscription.userId
					// });
					// setMessages(messages);
				}
			}
		}
	});

	const [sendMessageMutation] = useMutation<
		SendMessage,
		SendMessageVariables
	>(SEND_MESSAGE, {
		onCompleted: ({ SendChatMessage }) => {
			const { res, error, message } = SendChatMessage;
			if (res && message && messages && userData) {
				// messages.push({
				// 	...message,
				// 	mine: userData.GetCurrentUser.user?.id === message.userId
				// });
				setMessages([
					...messages,
					{
						...message,
						mine:
							userData.GetCurrentUser.user?.id === message.userId
					}
				]);
				setMessage("");
			} else {
				toast.error(error);
			}
		},
		variables: {
			chatId: parseInt(chatId, 10),
			text: message
		}
	});

	return (
		<ChatPresenter
			messages={messages}
			message={message}
			onChangeMessage={onChangeMessage}
			sendMessageMutation={sendMessageMutation}
			backFn={history.goBack}
			rideId={rideId}
		/>
	);
};

export default ChatContainer;
