import { gql } from "apollo-boost";

export const TOGGLE_DRIVING_MODE = gql`
	mutation ToggleDrivingMode {
		ToggleDrivingMode {
			res
			error
		}
	}
`;
