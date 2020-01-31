import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetChatById,
	GetChatByIdVariables,
	GetCurrentUser,
	MessageSubscription,
	SendMessage,
	SendMessageVariables
} from "../../types/api";
import { useInput } from "../../utils/hooks";
import ChatPresenter from "./ChatPresenter";
import {
	GET_CHAT_BY_ID,
	MESSAGE_SUBSCRIPTION,
	SEND_MESSAGE
} from "./ChatQueries";

interface IRouteParams {
	chatId: string;
}
interface IProps extends RouteComponentProps<IRouteParams> {}

// refactor with refetch form like places
const ChatContainer: React.FC<IProps> = ({ history, location, match }) => {
	const {
		params: { chatId }
	} = match;

	const [rideId, setRideId] = useState<number>(-1);
	const [message, onChangeMessage, setMessage] = useInput("");
	const { data: userData } = useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "network-only"
	});

	const { data: chatData, refetch } = useQuery<
		GetChatById,
		GetChatByIdVariables
	>(GET_CHAT_BY_ID, {
		onCompleted: ({ GetChatById }) => {
			const { res, error, chat } = GetChatById;
			if (res && chat && chat.rideId) {
				setRideId(chat.rideId);
			} else {
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
		onSubscriptionData: () => refetch()
	});

	const [sendMessageMutation] = useMutation<
		SendMessage,
		SendMessageVariables
	>(SEND_MESSAGE, {
		onCompleted: ({ SendChatMessage }) => {
			const { res, error } = SendChatMessage;
			if (res) {
				setMessage("");
				refetch();
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
			chatData={chatData}
			currentUser={userData}
			message={message}
			onChangeMessage={onChangeMessage}
			sendMessageMutation={sendMessageMutation}
			rideId={rideId}
		/>
	);
};

export default ChatContainer;
