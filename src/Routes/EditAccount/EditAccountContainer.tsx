import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useReducer, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	GetCurrentUser,
	GetCurrentUser_GetCurrentUser_user,
	UpdateCurrentUser,
	UpdateCurrentUserVariables
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { EDIT_USER } from "./EditAccountQueries";

export interface IUserProps {
	key: string;
	label: string;
	type?: string;
}

interface IProps extends RouteComponentProps {}

const EditAccountContainer: React.FC<IProps> = ({ history }) => {
	const { data, loading } = useQuery<GetCurrentUser>(GET_CURRENT_USER);
	const userProps: IUserProps[] = [
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

	// useReducer way
	// const [userInput, setUserInput] = useReducer(
	// 	(state, newState) => ({...state, ...newState}),
	// 	{
	// 	firstName: '',
	// 	lastName: '',
	// 	phoneNumber: '',
	// 	}
	//   );
	const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value: newValue, name: nameOfInput }
		} = event;

		// useState way
		setInputState({ ...inputState, [nameOfInput]: newValue });
		// useReducer way
		// setUserInput({[nameOfInput]: newValue});
	};

	// for initialize the input
	useEffect(() => {
		if (data && data.GetCurrentUser && data.GetCurrentUser.user) {
			const userData: GetCurrentUser_GetCurrentUser_user =
				data.GetCurrentUser.user;
			const { firstName, lastName, email, phoneNumber } = userData;
			setInputState({
				...inputState,
				email: email || "",
				firstName,
				lastName,
				phoneNumber: phoneNumber || ""
			});
		}
	}, [data, loading]);

	const [updateUserMutaion] = useMutation<
		UpdateCurrentUser,
		UpdateCurrentUserVariables
	>(EDIT_USER, {
		onCompleted: ({ UpdateCurrentUser: UpdateCurrentUserResult }) => {
			const { res, error } = UpdateCurrentUserResult;
			if (res) {
				toast.success("Your accout info has been updated");
				history.push("/");
			} else {
				toast.error(error);
			}
		},
		// update: async (caches, { data }) => {
		// 	if (data) {
		// 		const mutationResult: UpdateCurrentUser_UpdateCurrentUser =
		// 			data.UpdateCurrentUser;
		// 		const { res, error } = mutationResult;
		// 		if (res) {
		// 			const queryInCaches: any = caches.readQuery({
		// 				query: GET_CURRENT_USER
		// 			});
		// 			console.log(queryInCaches);
		// 			if (
		// 				queryInCaches &&
		// 				queryInCaches.GetCurrentUser &&
		// 				queryInCaches.GetCurrentUser.user
		// 			) {
		// 				queryInCaches.GetCurrentUser.user.isDriving = !queryInCaches
		// 					.GetCurrentUser.user.isDriving;
		// 			}
		// 			await caches.writeQuery({
		// 				data: queryInCaches,
		// 				query: GET_CURRENT_USER
		// 			});
		// 			history.push("/");
		// 			console.log(caches);
		// 		} else {
		// 			toast.error(error);
		// 		}
		// 	}
		// }
		refetchQueries: () => [{ query: GET_CURRENT_USER }]
	});

	const submitFn = () => {
		if (
			inputState.password &&
			inputState.passwordConfirm &&
			inputState.password !== inputState.passwordConfirm
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
		/>
	);
};

export default EditAccountContainer;
