import Axios from "axios";
import { FindPlaceQueryArgs, FindPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Query: {
		FindPlace: async (
			_,
			args: FindPlaceQueryArgs,
			{ req }
		): Promise<FindPlaceResponse> => {
			const { name, lat, lng } = args;
			// "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&name=harbour&fields=formatted_address&key=AIzaSyBX_l2TLTE9DnwuvS4cU-9QYo-TTlZVlVk"`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyBX_l2TLTE9DnwuvS4cU-9QYo-TTlZVlVk`;
			// `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyBX_l2TLTE9DnwuvS4cU-9QYo-TTlZVlVk`;
			const queryURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=5000&fields=formatted_address&name=${name}&location=${lat},${lng}&key=${process.env.GOOGLE_MAP_API}`;
			console.log(queryURL);
			try {
				const result = await Axios.get(queryURL);
				console.log(result.data);
				return {
					res: true,
					error: null,
					place: null
				};
			} catch (error) {
				return {
					res: false,
					error: error.message,
					place: null
				};
			}
		}
	}
};

export default resolvers;
