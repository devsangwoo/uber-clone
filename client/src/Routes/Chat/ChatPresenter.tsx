import React from "react";
import Routes from "..";
import Header from "../../Components/Header";
import Message from "../../Components/Message";
import {
	GetChatById,
	GetChatById_GetChatById_chat,
	GetCurrentUser,
	GetCurrentUser_GetCurrentUser_user
} from "../../types/api";
import * as S from "./ChatStyle";

interface IProps {
	chatData?: GetChatById;
	currentUser?: GetCurrentUser;
	message: string;
	onChangeMessage: (event: React.ChangeEvent<Element>) => any;
	sendMessageMutation: any;
	rideId: number;
}

const renderMessage = (
	chat: GetChatById_GetChatById_chat,
	user: GetCurrentUser_GetCurrentUser_user
) => {
	if (chat.messages) {
		const { messages } = chat;
		return messages.map(message => {
			if (message) {
				return (
					<Message
						key={`${Math.random().toString()}`}
						{...message}
						mine={user.id === message.userId}
					/>
				);
			}
			return null;
		});
	}
};

const ChatPresenter: React.FC<IProps> = ({
	chatData: { GetChatById: { chat = null } = {} } = {},
	currentUser: { GetCurrentUser: { user = null } = {} } = {},
	message,
	onChangeMessage,
	sendMessageMutation,
	rideId
}) => {
	return (
		<S.Container>
			<Header title="Chat" backTo={Routes.RIDE + `${rideId}`} />
			<S.Chat>{chat && user && renderMessage(chat, user)}</S.Chat>
			<S.Form onSubmit={sendMessageMutation}>
				<S.Input
					value={message}
					onChange={onChangeMessage}
					placeholder={"Send a message"}
				/>
				<S.Button type={"submit"}>SEND</S.Button>
			</S.Form>
		</S.Container>
	);
};

export default ChatPresenter;
