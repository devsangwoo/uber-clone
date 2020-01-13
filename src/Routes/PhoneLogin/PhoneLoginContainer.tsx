import React, { ReactEventHandler } from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { useInput } from "../../hooks";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_PHONE } from "./PhoneLoginQueries";
import { PhoneVerification, PhoneVerificationVariables } from "../../types/api";
import { RouteComponentProps } from "react-router-dom";
import { MutationUpdaterFn } from "apollo-boost";

const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
	const [phoneNumber, onInputChange] = useInput("", /^[0-9]*$/);
	const [countryCode, onSelectChange] = useInput("+33");
	const [verifyPhoneMutation, { loading }] = useMutation<
		PhoneVerification,
		PhoneVerificationVariables
	>(VERIFY_PHONE);

	const fullPhoneNumber = `${countryCode}${phoneNumber}`;
	const onSubmitUpdate: MutationUpdaterFn = (_, result: any) => {
		const data: PhoneVerification = result.data;
		const { res, error } = data.PhoneVerification;
		if (res) {
			toast.success("SMS has been sent with verification code", {
				autoClose: 1900
			});
			setTimeout(() => {
				history.push({
					pathname: "/verify-phone",
					state: { phoneNumber: fullPhoneNumber }
				});
			}, 2000);
		} else {
			toast.error(error);
		}
	};

	const onSubmit: ReactEventHandler<HTMLFormElement> = event => {
		event.preventDefault();
		const fullPhoneNumber = `${countryCode}${phoneNumber}`;
		verifyPhoneMutation({
			variables: { phoneNumber: fullPhoneNumber },
			update: onSubmitUpdate
		});
	};

	return (
		<PhoneLoginPresenter
			countryCode={countryCode}
			phoneNumber={phoneNumber}
			onInputChange={onInputChange}
			onSelectChange={onSelectChange}
			onSubmit={onSubmit}
			loading={loading}
		/>
	);
};

export default PhoneLoginContainer;
