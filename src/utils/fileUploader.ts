import axios from "axios";

export const fileUploader = async (files: FileList) => {
	const formData = new FormData();
	console.log(files[0]);
	formData.append("file", files[0]);
	formData.append("api_key", "194458411225384");
	formData.append("upload_preset", "bt8sqxpa");
	formData.append("timestamp", String(Date.now() / 1000));

	const { data } = await axios.post(
		"https://api.cloudinary.com/v1_1/dlspewfdb/image/upload",
		formData
	);
	console.log(data);
	if (data) {
		const { secure_url } = data;
		console.log(secure_url);
		return secure_url || null;
	}

	return null;
};
