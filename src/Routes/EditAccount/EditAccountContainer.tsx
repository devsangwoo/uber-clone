import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import Routes from "..";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetCurrentUser,
	GetCurrentUser_GetCurrentUser_user,
	UpdateCurrentUser,
	UpdateCurrentUserVariables
} from "../../types/api";
import { fileUploader } from "../../utils/fileUploader";
import EditAccountPresenter from "./EditAccountPresenter";
import { EDIT_USER } from "./EditAccountQueries";

export interface IUserProps {
	key: string;
	label: string;
	type?: string;
}

interface IProps extends RouteComponentProps {}

const EditAccountContainer: React.FC<IProps> = ({ history }) => {
	const userProps: IUserProps[] = [
		{ key: "profilePhoto", label: "photo" },
		{ key: "firstName", label: "First Name" },
		{ key: "lastName", label: "Last Name" },
		{ key: "email", label: "Email" },
		{ key: "phoneNumber", label: "Phone Number" },
		{ key: "password", label: "Password", type: "password" },
		{
			key: "passwordConfirm",
			label: "Password Confirmation",
			type: "password"
		}
	];

	const initialState: { [key: string]: string } = {};
	userProps.forEach(props => {
		initialState[props.key] = "";
	});
	// useState way
	const [inputState, setInputState] = useState(initialState);
	const [uploading, setUploading] = useState(false);

	useQuery<GetCurrentUser>(GET_CURRENT_USER, {
		fetchPolicy: "cache-and-network",
		onCompleted: ({ GetCurrentUser: { user = {} } = {} }) => {
			if (user) {
				// const {
				// 	firstName,
				// 	lastName,
				// 	email,
				// 	phoneNumber,
				// 	profilePhoto
				// } = user;
				// setInputState({
				// 	firstName: firstName || "",
				// 	lastName: lastName || "",
				// 	email: email || "",
				// 	phoneNumber: phoneNumber || "",
				// 	profilePhoto: profilePhoto || ""
				// });
				// for (const key in user) {
				// 	initialState.key = user[key];
				// }
				// userProps.forEach(props => {
				// 	if (props.key && user[props.key])
				// 	initialState[props.key] =
				// })
			}
		}
	});

	const [updateUserMutaion] = useMutation<
		UpdateCurrentUser,
		UpdateCurrentUserVariables
	>(EDIT_USER, {
		onCompleted: ({ UpdateCurrentUser: UpdateCurrentUserResult }) => {
			const { res, error } = UpdateCurrentUserResult;
			if (res) {
				toast.success("Your accout info has been updated");
				history.push(Routes.HOME);
			} else {
				toast.error(error);
			}
		},
		refetchQueries: () => [{ query: GET_CURRENT_USER }]
	});

	const onHandleChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const {
			target: { value: newValue, name: nameOfInput, files }
		} = event;
		if (files) {
			setUploading(true);
			const photoUrl = await fileUploader(files);
			if (photoUrl) {
				setUploading(false);
				setInputState({ ...inputState, profilePhoto: photoUrl });
			}
		} else {
			// useState way
			setInputState({ ...inputState, [nameOfInput]: newValue });
		}
	};

	const submitFn = () => {
		// should fix
		if (
			(!inputState.password && inputState.passwordConfirm) ||
			(inputState.password && !inputState.passwordConfirm) ||
			(inputState.password &&
				inputState.passwordConfirm &&
				inputState.password !== inputState.passwordConfirm)
		) {
			toast.error("You typed different password, please check again");
			return;
		}
		const nonNullState: { [key: string]: string } = {};
		for (const key in inputState) {
			if (inputState[key]) {
				nonNullState[key] = inputState[key];
			}
		}
		updateUserMutaion({ variables: { ...nonNullState } });
	};

	return (
		<EditAccountPresenter
			submitFn={submitFn}
			userProps={userProps}
			inputProps={inputState}
			onChangeHandler={onHandleChange}
			uploading={uploading}
		/>
	);
};

export default EditAccountContainer;
