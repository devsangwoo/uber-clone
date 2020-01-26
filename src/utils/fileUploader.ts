import axios from "axios";

export const fileUploader = async (files: FileList) => {
	const formData = new FormData();
	formData.append("file", files[0]);
	formData.append("api_key", process.env.REACT_APP_PHOTO_API || "");
	formData.append("upload_preset", process.env.REACT_APP_PHOTO_PRESET || "");
	formData.append("timestamp", String(Date.now() / 1000));

	const { data } = await axios.post(
		process.env.REACT_APP_PHOTO_URL || "",
		formData
	);
	if (data) {
		const { secure_url } = data;
		return secure_url || null;
	}

	return null;
};
