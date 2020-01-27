import React from "react";
import Routes from "..";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Message from "../../Components/Message";
import * as S from "./ChatStyle";

interface IProps {
	messages?: any[];
	message: string;
	onChangeMessage: (event: React.ChangeEvent<Element>) => any;
	sendMessageMutation: any;
	backFn: () => any;
	rideId: number;
}

const renderMessage = (messages: any[]) => {
	return messages.map((message, idx) => {
		return (
			<Message
				key={`${idx * message.userId * message.text.length}`}
				{...message}
			/>
		);
	});
};

const ChatPresenter: React.FC<IProps> = ({
	messages,
	message,
	onChangeMessage,
	sendMessageMutation,
	backFn,
	rideId
}) => {
	return (
		<Container>
			<Header title="Chat" backTo={Routes.RIDE + `${rideId}`} />
			<S.Chat>{messages && renderMessage(messages)}</S.Chat>
			<S.Form onSubmit={sendMessageMutation}>
				<S.Input
					value={message}
					onChange={onChangeMessage}
					placeholder={"Send a message"}
				/>
				<S.Button type={"submit"}>SEND</S.Button>
			</S.Form>
		</Container>
	);
};

export default ChatPresenter;
