import React from "react";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import * as S from "./SignUpStyle";

type InputHook = [string, (event: React.ChangeEvent<Element>) => any];

interface IInputHandler {
	label: string;
	onChange: (event: React.ChangeEvent<Element>) => any;
	type?: string;
	value: string;
}

interface IProps {
	firstName: IInputHandler;
	lastName: IInputHandler;
	email: IInputHandler;
	password: IInputHandler;
	passwordConfirm: IInputHandler;
	submitFn: any;
	loading: boolean;
}

const renderInputs = (inputArr: IInputHandler[]) => {
	return inputArr.map(input => {
		return (
			<Container key={input.label}>
				<Label label={input.label} />
				<S.InputExtend
					type={input.type || "text"}
					value={input.value}
					onChange={input.onChange}
				/>
			</Container>
		);
	});
};

const SignUpPresenter: React.FC<IProps> = ({
	firstName,
	lastName,
	email,
	password,
	passwordConfirm,
	submitFn,
	loading
}) => {
	return (
		<Container>
			<Header title={"SignUp"} backTo={"/"} />
			<S.FromExtend submitFn={submitFn}>
				{renderInputs([
					firstName,
					lastName,
					email,
					password,
					passwordConfirm
				])}
				<Button value={loading ? "In Progress" : "SignUp"} />
			</S.FromExtend>
		</Container>
	);
};

export default SignUpPresenter;
