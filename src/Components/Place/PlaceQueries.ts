import { gql } from "apollo-boost";

export const EDIT_PLACE = gql`
	mutation EditPlace($id: Int!, $isFav: Boolean!) {
		EditPlace(id: $id, isFav: $isFav) {
			res
			error
		}
	}
`;
