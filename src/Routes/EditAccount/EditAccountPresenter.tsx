import React from "react";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import PhotoInput from "../../Components/PhotoInput";
import { IUserProps } from "./EditAccountContainer";
import * as S from "./EditAccountStyle";

interface IRenderInputArgs {
	userProps: IUserProps[];
	inputProps: { [key: string]: string };
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

interface IProps extends IRenderInputArgs {
	submitFn: any;
	uploading: boolean;
}

const renderInputs = (args: IRenderInputArgs) => {
	return args.userProps.map(userProp => {
		return (
			userProp.key !== "profilePhoto" && (
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
			)
		);
	});
};

const EditAccountPresenter: React.FC<IProps> = ({
	inputProps,
	onChangeHandler,
	submitFn,
	userProps,
	uploading
}) => {
	return (
		<Container>
			<Header title={"Edit Account"} backTo={"/"} />
			<S.Container>
				<PhotoInput
					uploading={uploading}
					fileUrl={inputProps.profilePhoto}
					onChange={onChangeHandler}
				/>
			</S.Container>
			<S.FromExtend submitFn={submitFn}>
				{renderInputs({
					inputProps,
					onChangeHandler,
					userProps
				})}
				<Button value={"Update"} />
			</S.FromExtend>
		</Container>
	);
};

export default EditAccountPresenter;
