import nodemailer from "nodemailer";

const getTransporter = async () => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_ADDR,
			pass: process.env.MAIL_PASS
		}
	});

	return transporter;
};

export const sendMail = async (to: string, subject: string, html: string) => {
	const transporter = await getTransporter();

	// send mail with defined transport object
	await transporter.sendMail({
		from: process.env.MAIL_ADDR, // sender address
		to,
		subject,
		html
	});
};

export const sendVerificationMail = async (to: string, key: string) => {
	const subject = "Verify your email";
	const url =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://project-nuber.herokuapp.com";
	const html = `
		<div>your verfication key is <u>${key}</u></div>
		<div>or click <a href="${url}/email-verify/${key}">here</a> to verify your email</div>
	`;

	await sendMail(to, subject, html);
};
