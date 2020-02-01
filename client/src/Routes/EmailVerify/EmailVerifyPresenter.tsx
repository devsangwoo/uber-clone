import React from "react";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import routes from "../routes";
import * as S from "./EmailVerifyStyle";

interface IProps {
	InputKey: string;
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	sumbitFn: any;
	inProgress: boolean;
	requestEmailMutation: any;
}

const EmailVerifyPresenter: React.FC<IProps> = ({
	InputKey,
	onChangeHandler,
	sumbitFn,
	inProgress,
	requestEmailMutation
}) => {
	return (
		<React.Fragment>
			<Header title={"Email Verification"} backTo={routes.NUBER} />
			<S.Container>
				<Form submitFn={sumbitFn}>
					<Input
						value={InputKey}
						onChange={onChangeHandler}
						placeholder="Enter Verification code"
						autoFocus={true}
					/>
				</Form>
				<Button
					onClick={sumbitFn}
					value={inProgress ? "in progress..." : "VERIFY"}
				/>
				<S.Anchor onClick={requestEmailMutation}>
					request new verification code
				</S.Anchor>
			</S.Container>
		</React.Fragment>
	);
};

export default EmailVerifyPresenter;
