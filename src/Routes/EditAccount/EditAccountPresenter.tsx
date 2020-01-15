import React from "react";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import { IUserProps } from "./EditAccountContainer";
import * as S from "./EditAccountStyle";
// type InputHook = [string, (event: React.ChangeEvent<Element>) => any];

// interface IInputHandler {
// 	label: string;
// 	onChange: (event: React.ChangeEvent<Element>) => any;
// 	type?: string;
// 	value: string;
// }

// interface IProps {
// 	firstName: IInputHandler;
// 	lastName: IInputHandler;
// 	email: IInputHandler;
// 	password: IInputHandler;
// 	passwordConfirm: IInputHandler;
// 	submitFn: any;
// 	loading: boolean;
// }

interface IProps {
	userProps: IUserProps[];
	inputProps: { [key: string]: string };
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => any;
	submitFn: any;
}

const renderInputs = (args: IProps) => {
	return args.userProps.map(userProp => {
		return (
			<Container key={userProp.label}>
				<Label label={userProp.label} />
				<S.InputExtend
					name={userProp.key}
					type={userProp.type || "text"}
					value={args.inputProps[userProp.key]}
					onChange={args.onChangeHandler}
					required={false}
				/>
			</Container>
		);
	});
};

const EditAccountPresenter: React.FC<IProps> = props => {
	const { submitFn } = props;
	return (
		<Container>
			<Header title={"Edit Account"} backTo={"/"} />
			<S.FromExtend submitFn={submitFn}>
				{renderInputs(props)}
				<Button value={"Update"} />
			</S.FromExtend>
		</Container>
	);
};

export default EditAccountPresenter;
