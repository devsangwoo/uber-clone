import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import { USER_LOG_OUT } from "../../SharedQueries.local";
import { ToggleDrivingMode } from "../../types/api";
import MenuPresenter from "./MenuPresenter";
import { TOGGLE_DRIVING_MODE } from "./MenuQueries";

const MenuContainer: React.FC = () => {
	const { data, loading } = useQuery(GET_CURRENT_USER);
	const [toggleDrivingMutation] = useMutation<ToggleDrivingMode>(
		TOGGLE_DRIVING_MODE,
		{
			// refetchQueries: () => [{ query: GET_CURRENT_USER }]
			// much safer below, I don't know yet
			update: (cache, { data: ToggleDrivingModeResult }) => {
				if (ToggleDrivingModeResult) {
					const {
						ToggleDrivingMode: mutationResult
					} = ToggleDrivingModeResult;
					const { res, error } = mutationResult;
					if (res) {
						const queryInCaches: any = cache.readQuery({
							query: GET_CURRENT_USER
						});
						if (
							queryInCaches &&
							queryInCaches.GetCurrentUser &&
							queryInCaches.GetCurrentUser.user
						) {
							queryInCaches.GetCurrentUser.user.isDriving = !queryInCaches
								.GetCurrentUser.user.isDriving;
						}
						cache.writeQuery({
							data: queryInCaches,
							query: GET_CURRENT_USER
						});
					} else {
						toast.error(error);
					}
				}
			}
		}
	);
	const [logOutMutation] = useMutation(USER_LOG_OUT);

	return (
		<MenuPresenter
			data={loading ? undefined : data}
			toggleDrivingFn={toggleDrivingMutation}
			logout={logOutMutation}
		/>
	);
};

export default MenuContainer;
