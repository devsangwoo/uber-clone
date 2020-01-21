/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNearbyRides
// ====================================================

export interface GetNearbyRides_GetNearbyRides_rides {
	__typename: "Ride";
	id: number;
	pickUpAddress: string;
	pickUpLat: number;
	pickUpLng: number;
	dropOffAddress: string;
	dropOffLat: number;
	dropOffLng: number;
	price: number | null;
	distance: string | null;
	duration: string | null;
}

export interface GetNearbyRides_GetNearbyRides {
	__typename: "GetNearbyRidesResponse";
	res: boolean;
	error: string | null;
	rides: (GetNearbyRides_GetNearbyRides_rides | null)[] | null;
}

export interface GetNearbyRides {
	GetNearbyRides: GetNearbyRides_GetNearbyRides;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: RideSubscription
// ====================================================

export interface RideSubscription_RideSubscription {
	__typename: "Ride";
	id: number;
	pickUpAddress: string;
	pickUpLat: number;
	pickUpLng: number;
	dropOffAddress: string;
	dropOffLat: number;
	dropOffLng: number;
	price: number | null;
	distance: string | null;
	duration: string | null;
}

export interface RideSubscription {
	RideSubscription: RideSubscription_RideSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TakeRequestedRide
// ====================================================

export interface TakeRequestedRide_TakeRequestedRide {
	__typename: "TakeRequestedRideResponse";
	res: boolean;
	error: string | null;
}

export interface TakeRequestedRide {
	TakeRequestedRide: TakeRequestedRide_TakeRequestedRide;
}

export interface TakeRequestedRideVariables {
	rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleDrivingMode
// ====================================================

export interface ToggleDrivingMode_ToggleDrivingMode {
	__typename: "ToggleDrivingModeResponse";
	res: boolean;
	error: string | null;
}

export interface ToggleDrivingMode {
	ToggleDrivingMode: ToggleDrivingMode_ToggleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RequestRide
// ====================================================

export interface RequestRide_RequestRide_ride {
	__typename: "Ride";
	id: number;
}

export interface RequestRide_RequestRide {
	__typename: "RequestRideResponse";
	res: boolean;
	error: string | null;
	ride: RequestRide_RequestRide_ride | null;
}

export interface RequestRide {
	RequestRide: RequestRide_RequestRide;
}

export interface RequestRideVariables {
	pickUpAddress: string;
	pickUpLat: number;
	pickUpLng: number;
	dropOffAddress: string;
	dropOffLat: number;
	dropOffLng: number;
	duration: string;
	distance: string;
	price: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNearbyDrivers
// ====================================================

export interface GetNearbyDrivers_GetNearbyDrivers_drivers {
	__typename: "User";
	id: number;
	fullName: string | null;
	profilePhoto: string | null;
	lastLat: number | null;
	lastLng: number | null;
}

export interface GetNearbyDrivers_GetNearbyDrivers {
	__typename: "GetNearbyDriversResponse";
	res: boolean;
	error: string | null;
	drivers: (GetNearbyDrivers_GetNearbyDrivers_drivers | null)[] | null;
}

export interface GetNearbyDrivers {
	GetNearbyDrivers: GetNearbyDrivers_GetNearbyDrivers;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRideStatus
// ====================================================

export interface UpdateRideStatus_UpdateRideStatus {
	__typename: "UpdateRideStatusResponse";
	res: boolean;
	error: string | null;
}

export interface UpdateRideStatus {
	UpdateRideStatus: UpdateRideStatus_UpdateRideStatus;
}

export interface UpdateRideStatusVariables {
	rideId: number;
	status: StatusOptions;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRideById
// ====================================================

export interface GetRideById_GetRideById_ride {
	__typename: "Ride";
	id: number;
	status: string;
}

export interface GetRideById_GetRideById {
	__typename: "GetRideByIdResponse";
	res: boolean;
	error: string | null;
	ride: GetRideById_GetRideById_ride | null;
}

export interface GetRideById {
	GetRideById: GetRideById_GetRideById;
}

export interface GetRideByIdVariables {
	rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPlace
// ====================================================

export interface EditPlace_EditPlace {
	__typename: "EditPlaceResponse";
	res: boolean;
	error: string | null;
}

export interface EditPlace {
	EditPlace: EditPlace_EditPlace | null;
}

export interface EditPlaceVariables {
	id: number;
	isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCurrentUser
// ====================================================

export interface UpdateCurrentUser_UpdateCurrentUser {
	__typename: "UpdateCurrentUserRespone";
	res: boolean;
	error: string | null;
}

export interface UpdateCurrentUser {
	UpdateCurrentUser: UpdateCurrentUser_UpdateCurrentUser;
}

export interface UpdateCurrentUserVariables {
	firstName?: string | null;
	lastName?: string | null;
	email?: string | null;
	password?: string | null;
	phoneNumber?: string | null;
	profilePhoto?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaces
// ====================================================

export interface GetPlaces_GetMyPlaces_places {
	__typename: "Place";
	id: number;
	address: string;
	isFav: boolean;
	name: string;
}

export interface GetPlaces_GetMyPlaces {
	__typename: "GetMyPlacesResponse";
	res: boolean;
	error: string | null;
	places: (GetPlaces_GetMyPlaces_places | null)[] | null;
}

export interface GetPlaces {
	GetMyPlaces: GetPlaces_GetMyPlaces | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportMovement
// ====================================================

export interface ReportMovement_ReportMovement {
	__typename: "ReportMovementResponse";
	res: boolean;
	error: string | null;
}

export interface ReportMovement {
	ReportMovement: ReportMovement_ReportMovement;
}

export interface ReportMovementVariables {
	lastLng: number;
	lastLat: number;
}

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

// ====================================================
// GraphQL query operation: GetCurrentUser
// ====================================================

export interface GetCurrentUser_GetCurrentUser_user {
	__typename: "User";
	firstName: string;
	lastName: string;
	fullName: string | null;
	isDriving: boolean;
	email: string | null;
	verifiedEmail: boolean;
	phoneNumber: string | null;
	verifiedPhoneNumber: boolean;
	profilePhoto: string | null;
}

export interface GetCurrentUser_GetCurrentUser {
	__typename: "GetCurrentUserResponse";
	res: boolean;
	error: string | null;
	user: GetCurrentUser_GetCurrentUser_user | null;
}

export interface GetCurrentUser {
	GetCurrentUser: GetCurrentUser_GetCurrentUser;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOptions {
	ACCEPTED = "ACCEPTED",
	CANCELED = "CANCELED",
	FINISHED = "FINISHED",
	ONROUTE = "ONROUTE",
	REQUESTED = "REQUESTED"
}

//==============================================================
// END Enums and Input Objects
//==============================================================
