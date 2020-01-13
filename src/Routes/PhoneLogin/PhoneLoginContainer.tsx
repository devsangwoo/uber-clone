import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { useInput } from "../../hooks";
import { PhoneVerification, PhoneVerificationVariables } from "../../types/api";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { VERIFY_PHONE } from "./PhoneLoginQueries";

const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
	const [phoneNumber, onInputChange] = useInput("", /^[0-9]*$/);
	const [countryCode, onSelectChange] = useInput("+33");
	const phoneNumberWithCode = `${countryCode}${phoneNumber}`;

	const [verifyPhoneMutation, { loading }] = useMutation<
		PhoneVerification,
		PhoneVerificationVariables
	>(VERIFY_PHONE, {
		onCompleted: ({ PhoneVerification: PhoneVerificationResult }) => {
			const { res, error } = PhoneVerificationResult;
			if (res) {
				toast.success("SMS has been sent with verification code", {
					autoClose: 1900
				});
				setTimeout(() => {
					history.push({
						pathname: "/verify-phone",
						state: { phoneNumber: phoneNumberWithCode }
					});
				}, 2000);
			} else {
				toast.error(error);
				history.push("/phone-login");
			}
		},
		variables: { phoneNumber: phoneNumberWithCode }
	});

	return (
		<PhoneLoginPresenter
			countryCode={countryCode}
			phoneNumber={phoneNumber}
			onInputChange={onInputChange}
			onSelectChange={onSelectChange}
			onSubmit={verifyPhoneMutation}
			loading={loading}
		/>
	);
};

export default PhoneLoginContainer;
