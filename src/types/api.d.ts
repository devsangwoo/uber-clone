/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PhoneVerification
// ====================================================

export interface PhoneVerification_PhoneVerification {
	__typename: "PhoneVerificationResponse";
	res: boolean;
	error: string | null;
}

export interface PhoneVerification {
	PhoneVerification: PhoneVerification_PhoneVerification;
}

export interface PhoneVerificationVariables {
	phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EmailSignUp
// ====================================================

export interface EmailSignUp_EmailSignUp {
	__typename: "EmailSignUpResponse";
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface EmailSignUp {
	EmailSignUp: EmailSignUp_EmailSignUp;
}

export interface EmailSignUpVariables {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ValidatePhoneVerification
// ====================================================

export interface ValidatePhoneVerification_ValidatePhoneVerification {
	__typename: "ValidatePhoneVerificationResponse";
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface ValidatePhoneVerification {
	ValidatePhoneVerification: ValidatePhoneVerification_ValidatePhoneVerification;
}

export interface ValidatePhoneVerificationVariables {
	phoneNumber: string;
	key: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
