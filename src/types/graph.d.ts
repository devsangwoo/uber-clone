export const typeDefs = [
	"type GetChatByIdResponse {\n  res: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChatById(chatId: Int!): GetChatByIdResponse!\n  FindPlace(name: String!, lat: Float!, lng: Float!): FindPlaceResponse!\n  GetMyPlaces: GetMyPlacesResponse\n  GetNearbyRides: GetNearbyRidesResponse!\n  GetRideById(rideId: Int!): GetRideByIdResponse!\n  GetRideHistory(isDriver: Boolean!, paging: Int!): GetRideHistoryResponse!\n  GetCurrentUser: GetCurrentUserResponse!\n  GetNearbyDrivers: GetNearbyDriversResponse!\n  GetUserById(userId: Int!): GetUserByIdResponse!\n  GetUserWithRideHistory: GetUserWithRideHistoryResponse!\n  users: [User]\n}\n\ntype Subscription {\n  MessageSubscription: Message\n  RideStatusSubscription: Ride\n  RideSubscription: Ride\n  DriverSubscription: User\n}\n\ntype SendChatMessageResponse {\n  res: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(chatId: Int!, text: String!): SendChatMessageResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(id: Int!): DeletePlaceResponse\n  EditPlace(id: Int!, name: String, isFav: Boolean): EditPlaceResponse\n  RequestRide(pickUpAddress: String!, pickUpLat: Float!, pickUpLng: Float!, dropOffAddress: String!, dropOffLat: Float!, dropOffLng: Float!, duration: String!, distance: String!, price: Float!, rideImage: String!): RequestRideResponse!\n  TakeRequestedRide(rideId: Int!): TakeRequestedRideResponse!\n  UpdateRideStatus(rideId: Int!, status: StatusOptions!): UpdateRideStatusResponse!\n  UpdateCurrentUser(firstName: String, lastName: String, email: String, password: String, profilePhoto: String, age: Int, phoneNumber: String): UpdateCurrentUserRespone!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, phoneNumber: String!): EmailSignUpResponse!\n  EmailVerification: EmailVerificationResponse!\n  ValidateEmailVerification(key: String!): ValidateEmailVerificationResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  PhoneVerification(phoneNumber: String!): PhoneVerificationResponse!\n  ValidatePhoneVerification(phoneNumber: String!, key: String!): ValidatePhoneVerificationResponse!\n  ReportMovement(lastLng: Float, lastLat: Float, lastOrientation: Float): ReportMovementResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]\n  driverId: Int\n  driver: User\n  passengerId: Int\n  passenger: User\n  ride: Ride\n  rideId: Int\n  createAt: String!\n  updateAt: String!\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chatId: Int\n  chat: Chat!\n  userId: Int\n  user: User!\n  createAt: String!\n  updateAt: String!\n}\n\ntype AddPlaceResponse {\n  res: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  res: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  res: Boolean!\n  error: String\n}\n\ntype FindPlaceResponse {\n  res: Boolean!\n  error: String\n  place: Place\n}\n\ntype GetMyPlacesResponse {\n  res: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  userId: Int!\n  placeId: String\n  user: User!\n  createAt: String!\n  updateAt: String!\n}\n\ntype GetNearbyRidesResponse {\n  res: Boolean!\n  error: String\n  rides: [Ride]\n}\n\ntype GetRideByIdResponse {\n  res: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype GetRideHistoryResponse {\n  res: Boolean!\n  error: String\n  rides: [Ride]\n}\n\ntype RequestRideResponse {\n  res: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float\n  distance: String\n  duration: String\n  driver: User\n  passenger: User\n  passengerId: Int\n  driverId: Int\n  chat: Chat\n  chatId: Int\n  rideImage: String\n  currentUsers: [User]\n  createAt: String!\n  updateAt: String!\n}\n\ntype TakeRequestedRideResponse {\n  res: Boolean!\n  error: String\n}\n\ntype UpdateRideStatusResponse {\n  res: Boolean!\n  error: String\n}\n\nenum StatusOptions {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTED\n  ONROUTE\n}\n\ntype GetCurrentUserResponse {\n  res: Boolean!\n  error: String\n  user: User\n}\n\ntype UpdateCurrentUserRespone {\n  res: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  res: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  res: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailVerificationResponse {\n  res: Boolean!\n  error: String\n}\n\ntype ValidateEmailVerificationResponse {\n  res: Boolean!\n  error: String\n}\n\ntype FacebookConnectResponse {\n  res: Boolean!\n  error: String\n  token: String\n}\n\ntype GetNearbyDriversResponse {\n  res: Boolean!\n  error: String\n  drivers: [User]\n}\n\ntype GetUserByIdResponse {\n  res: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserWithRideHistoryResponse {\n  res: Boolean!\n  error: String\n  user: User\n}\n\ntype PhoneVerificationResponse {\n  res: Boolean!\n  error: String\n}\n\ntype ValidatePhoneVerificationResponse {\n  res: Boolean!\n  error: String\n  token: String\n}\n\ntype ReportMovementResponse {\n  res: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  fbId: String\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fullName: String\n  isDriving: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  chatAsDriver: [Chat]\n  chatAsPassenger: [Chat]\n  messages: [Message]\n  rideAsDriver: [Ride]\n  rideAsPassenger: [Ride]\n  places: [Place]\n  currentRide: Ride\n  currentRideId: Int\n  createAt: String!\n  updateAt: String\n}\n\ntype ToggleDrivingModeResponse {\n  res: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createAt: String!\n  updateAt: String!\n}\n"
];
/* tslint:disable */

export interface Query {
	GetChatById: GetChatByIdResponse;
	FindPlace: FindPlaceResponse;
	GetMyPlaces: GetMyPlacesResponse | null;
	GetNearbyRides: GetNearbyRidesResponse;
	GetRideById: GetRideByIdResponse;
	GetRideHistory: GetRideHistoryResponse;
	GetCurrentUser: GetCurrentUserResponse;
	GetNearbyDrivers: GetNearbyDriversResponse;
	GetUserById: GetUserByIdResponse;
	GetUserWithRideHistory: GetUserWithRideHistoryResponse;
	users: Array<User> | null;
}

export interface GetChatByIdQueryArgs {
	chatId: number;
}

export interface FindPlaceQueryArgs {
	name: string;
	lat: number;
	lng: number;
}

export interface GetRideByIdQueryArgs {
	rideId: number;
}

export interface GetRideHistoryQueryArgs {
	isDriver: boolean;
	paging: number;
}

export interface GetUserByIdQueryArgs {
	userId: number;
}

export interface GetChatByIdResponse {
	res: boolean;
	error: string | null;
	chat: Chat | null;
}

export interface Chat {
	id: number;
	messages: Array<Message> | null;
	driverId: number | null;
	driver: User | null;
	passengerId: number | null;
	passenger: User | null;
	ride: Ride | null;
	rideId: number | null;
	createAt: string;
	updateAt: string;
}

export interface Message {
	id: number;
	text: string;
	chatId: number | null;
	chat: Chat;
	userId: number | null;
	user: User;
	createAt: string;
	updateAt: string;
}

export interface User {
	id: number;
	email: string | null;
	verifiedEmail: boolean;
	firstName: string;
	lastName: string;
	fbId: string | null;
	age: number | null;
	password: string | null;
	phoneNumber: string | null;
	verifiedPhoneNumber: boolean;
	profilePhoto: string | null;
	fullName: string | null;
	isDriving: boolean;
	isTaken: boolean;
	lastLng: number | null;
	lastLat: number | null;
	lastOrientation: number | null;
	chatAsDriver: Array<Chat> | null;
	chatAsPassenger: Array<Chat> | null;
	messages: Array<Message> | null;
	rideAsDriver: Array<Ride> | null;
	rideAsPassenger: Array<Ride> | null;
	places: Array<Place> | null;
	currentRide: Ride | null;
	currentRideId: number | null;
	createAt: string;
	updateAt: string | null;
}

export interface Ride {
	id: number;
	status: string;
	pickUpAddress: string;
	pickUpLat: number;
	pickUpLng: number;
	dropOffAddress: string;
	dropOffLat: number;
	dropOffLng: number;
	price: number | null;
	distance: string | null;
	duration: string | null;
	driver: User | null;
	passenger: User | null;
	passengerId: number | null;
	driverId: number | null;
	chat: Chat | null;
	chatId: number | null;
	rideImage: string | null;
	currentUsers: Array<User> | null;
	createAt: string;
	updateAt: string;
}

export interface Place {
	id: number;
	name: string;
	lat: number;
	lng: number;
	address: string;
	isFav: boolean;
	userId: number;
	placeId: string | null;
	user: User;
	createAt: string;
	updateAt: string;
}

export interface FindPlaceResponse {
	res: boolean;
	error: string | null;
	place: Place | null;
}

export interface GetMyPlacesResponse {
	res: boolean;
	error: string | null;
	places: Array<Place> | null;
}

export interface GetNearbyRidesResponse {
	res: boolean;
	error: string | null;
	rides: Array<Ride> | null;
}

export interface GetRideByIdResponse {
	res: boolean;
	error: string | null;
	ride: Ride | null;
}

export interface GetRideHistoryResponse {
	res: boolean;
	error: string | null;
	rides: Array<Ride> | null;
}

export interface GetCurrentUserResponse {
	res: boolean;
	error: string | null;
	user: User | null;
}

export interface GetNearbyDriversResponse {
	res: boolean;
	error: string | null;
	drivers: Array<User> | null;
}

export interface GetUserByIdResponse {
	res: boolean;
	error: string | null;
	user: User | null;
}

export interface GetUserWithRideHistoryResponse {
	res: boolean;
	error: string | null;
	user: User | null;
}

export interface Mutation {
	SendChatMessage: SendChatMessageResponse;
	AddPlace: AddPlaceResponse;
	DeletePlace: DeletePlaceResponse | null;
	EditPlace: EditPlaceResponse | null;
	RequestRide: RequestRideResponse;
	TakeRequestedRide: TakeRequestedRideResponse;
	UpdateRideStatus: UpdateRideStatusResponse;
	UpdateCurrentUser: UpdateCurrentUserRespone;
	EmailSignIn: EmailSignInResponse;
	EmailSignUp: EmailSignUpResponse;
	EmailVerification: EmailVerificationResponse;
	ValidateEmailVerification: ValidateEmailVerificationResponse;
	FacebookConnect: FacebookConnectResponse;
	PhoneVerification: PhoneVerificationResponse;
	ValidatePhoneVerification: ValidatePhoneVerificationResponse;
	ReportMovement: ReportMovementResponse;
	ToggleDrivingMode: ToggleDrivingModeResponse;
}

export interface SendChatMessageMutationArgs {
	chatId: number;
	text: string;
}

export interface AddPlaceMutationArgs {
	name: string;
	lat: number;
	lng: number;
	address: string;
	isFav: boolean;
}

export interface DeletePlaceMutationArgs {
	id: number;
}

export interface EditPlaceMutationArgs {
	id: number;
	name: string | null;
	isFav: boolean | null;
}

export interface RequestRideMutationArgs {
	pickUpAddress: string;
	pickUpLat: number;
	pickUpLng: number;
	dropOffAddress: string;
	dropOffLat: number;
	dropOffLng: number;
	duration: string;
	distance: string;
	price: number;
	rideImage: string;
}

export interface TakeRequestedRideMutationArgs {
	rideId: number;
}

export interface UpdateRideStatusMutationArgs {
	rideId: number;
	status: StatusOptions;
}

export interface UpdateCurrentUserMutationArgs {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	password: string | null;
	profilePhoto: string | null;
	age: number | null;
	phoneNumber: string | null;
}

export interface EmailSignInMutationArgs {
	email: string;
	password: string;
}

export interface EmailSignUpMutationArgs {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
}

export interface ValidateEmailVerificationMutationArgs {
	key: string;
}

export interface FacebookConnectMutationArgs {
	firstName: string;
	lastName: string;
	email: string | null;
	fbId: string;
}

export interface PhoneVerificationMutationArgs {
	phoneNumber: string;
}

export interface ValidatePhoneVerificationMutationArgs {
	phoneNumber: string;
	key: string;
}

export interface ReportMovementMutationArgs {
	lastLng: number | null;
	lastLat: number | null;
	lastOrientation: number | null;
}

export interface SendChatMessageResponse {
	res: boolean;
	error: string | null;
	message: Message | null;
}

export interface AddPlaceResponse {
	res: boolean;
	error: string | null;
}

export interface DeletePlaceResponse {
	res: boolean;
	error: string | null;
}

export interface EditPlaceResponse {
	res: boolean;
	error: string | null;
}

export interface RequestRideResponse {
	res: boolean;
	error: string | null;
	ride: Ride | null;
}

export interface TakeRequestedRideResponse {
	res: boolean;
	error: string | null;
}

export type StatusOptions =
	| "ACCEPTED"
	| "FINISHED"
	| "CANCELED"
	| "REQUESTED"
	| "ONROUTE";

export interface UpdateRideStatusResponse {
	res: boolean;
	error: string | null;
}

export interface UpdateCurrentUserRespone {
	res: boolean;
	error: string | null;
}

export interface EmailSignInResponse {
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface EmailSignUpResponse {
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface EmailVerificationResponse {
	res: boolean;
	error: string | null;
}

export interface ValidateEmailVerificationResponse {
	res: boolean;
	error: string | null;
}

export interface FacebookConnectResponse {
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface PhoneVerificationResponse {
	res: boolean;
	error: string | null;
}

export interface ValidatePhoneVerificationResponse {
	res: boolean;
	error: string | null;
	token: string | null;
}

export interface ReportMovementResponse {
	res: boolean;
	error: string | null;
}

export interface ToggleDrivingModeResponse {
	res: boolean;
	error: string | null;
}

export interface Subscription {
	MessageSubscription: Message | null;
	RideStatusSubscription: Ride | null;
	RideSubscription: Ride | null;
	DriverSubscription: User | null;
}

export interface Verification {
	id: number;
	target: string;
	payload: string;
	key: string;
	verified: boolean;
	createAt: string;
	updateAt: string;
}
