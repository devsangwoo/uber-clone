import React from "react";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Label from "../../Components/Label";
import PhotoInput from "../../Components/PhotoInput";
import { forceHistory } from "../../utils/forceHistory";
import Routes from "../routes";
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
	emailVerified: boolean;
	phoneVerified: boolean;
}

const EditAccountPresenter: React.FC<IProps> = ({
	inputProps,
	onChangeHandler,
	submitFn,
	userProps,
	uploading,
	emailVerified,
	phoneVerified
}) => {
	const renderInputs = (args: IRenderInputArgs) => {
		return args.userProps.map(userProp => {
			return (
				userProp.key !== "profilePhoto" && (
					<Container key={userProp.label}>
						{getLabel(userProp)}
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

	const getLabel = (userProp: IUserProps) => {
		if (userProp.key === "email") {
			userProp.label += emailVerified ? " ✅" : " ❌";
		}
		if (userProp.key === "phoneNumber") {
			userProp.label += phoneVerified ? " ✅" : " ❌";
		}
		return <Label label={userProp.label} />;
	};

	return (
		<Container>
			<Header
				title={"Edit Account"}
				backFn={() => forceHistory.push(Routes.NUBER)}
			/>
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
