import React, { useEffect, useRef } from "react";
import Header from "../../Components/Header";
import Message from "../../Components/Message";
import Routes from "../routes";
import * as S from "./ChatStyle";

interface IProps {
	messages?: any[];
	message: string;
	onChangeMessage: (event: React.ChangeEvent<Element>) => any;
	sendMessageMutation: any;
	rideId: number;
}

const renderMessage = (messages: any[]) => {
	return messages.map(message => {
		return <Message key={message.id} {...message} />;
	});
};

const ChatPresenter: React.FC<IProps> = ({
	messages,
	message,
	onChangeMessage,
	sendMessageMutation,
	rideId
}) => {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ref && ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [messages]);

	return (
		<S.Container>
			<Header title="Chat" backTo={Routes.RIDE + `${rideId}`} />
			<S.Chat ref={ref}>{messages && renderMessage(messages)}</S.Chat>
			<S.FormExtend submitFn={sendMessageMutation}>
				<S.Input
					value={message}
					onChange={onChangeMessage}
					placeholder={"Send a message"}
					autoFocus={true}
				/>
				<S.Button type={"submit"}>SEND</S.Button>
			</S.FormExtend>
		</S.Container>
	);
};

export default ChatPresenter;
