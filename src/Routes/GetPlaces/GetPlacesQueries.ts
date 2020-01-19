import { gql } from "apollo-boost";

export const GET_PLACES = gql`
	query GetPlaces {
		GetMyPlaces {
			res
			error
			places {
				id
				address
				isFav
				name
			}
		}
	}
`;

// export const EDIT_PLACE = gql`
// 	mutation EditPlace($id: Int!, $isFav: Boolean) {
// 		EditPlace(id: $id, isFav: $isFav) {
// 			res
// 			error
// 		}
// 	}
// `;
