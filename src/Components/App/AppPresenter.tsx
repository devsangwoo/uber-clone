import { useMutation } from "@apollo/react-hooks";
import React from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 58f39ad... [#1] router enviroment setting
// import { useMutation } from "@apollo/react-hooks";
// import { USER_LOG_OUT } from "./AppQueries";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

=======
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
>>>>>>> c002051... [#4] refactored with lint
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import SignUp from "../../Routes/SignUp";
import SocialLogin from "../../Routes/SocialLogin";
<<<<<<< HEAD
import FindAddress from "../../Routes/FindAddress";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useMutation } from "@apollo/react-hooks";
import { USER_LOG_OUT } from "./AppQueries";
>>>>>>> 37ade45... [#1] dev env setting
=======
>>>>>>> 58f39ad... [#1] router enviroment setting
=======
import { useMutation } from "@apollo/react-hooks";
import { USER_LOG_OUT } from "./AppQueries.local";
>>>>>>> d32f194... [#4]Verification Done
=======
import VerifyPhone from "../../Routes/VerifyPhone";
import { USER_LOG_OUT } from "../../SharedQueries.local";
>>>>>>> c002051... [#4] refactored with lint

interface IProps {
	isLoggedIn: boolean;
}

<<<<<<< HEAD
<<<<<<< HEAD
const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => {
	const [logOut, { data, error, client }] = useMutation(USER_LOG_OUT);
	return (
		<BrowserRouter>
			{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
			<div>
				{isLoggedIn && (
					<button
						style={{ marginTop: "20px", width: "100%" }}
						onClick={() => logOut()}
					>
						logout
					</button>
				)}
			</div>
		</BrowserRouter>
	);
};

const LoggedOutRoutes: React.FC = () => (
	<Switch>
		<Route path={"/"} exact={true} component={Login} />
		<Route path={"/phone-login"} component={PhoneLogin} />
		<Route path={"/verify-phone"} component={VerifyPhone} />
		<Route path={"/sign-up"} component={SignUp} />
		<Route path={"/social-login"} component={SocialLogin} />
		<Redirect path={"*"} to={"/"} />
	</Switch>
);

const LoggedInRoutes: React.FC = () => (
	<Switch>
		<Route path={"/"} exact={true} component={Home} />
		<Route path={"/ride"} component={Ride} />
		<Route path={"/edit-account"} component={EditAccount} />
		<Route path={"/setting"} component={Settings} />
		<Route path={"/places"} component={Places} />
		<Route path={"/add-place"} component={AddPlace} />
		<Route path={"/find-address"} component={FindAddress} />
		<Redirect path={"*"} to={"/"} />
	</Switch>
);

<<<<<<< HEAD
=======
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => {
	const [logOut, { data, error, client }] = useMutation(USER_LOG_OUT);
	console.log(data);
	console.log(error);
	console.log(client);
=======
const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => {
	// const [logOut, { data, error, client }] = useMutation(USER_LOG_OUT);
>>>>>>> 58f39ad... [#1] router enviroment setting

	return (
		<BrowserRouter>
			{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
		</BrowserRouter>
		// <div>
		// 	<div>You are {isLoggedIn ? "In" : "Out"}</div>
		// 	{isLoggedIn && <button onClick={() => logOut()}>logout</button>}
		// </div>
	);
};

<<<<<<< HEAD
>>>>>>> 37ade45... [#1] dev env setting
=======
const LoggedOutRoutes: React.FC = () => (
	<Switch>
		<Route path={"/"} exact component={OutHome} />
		<Route path={"/phone-login"} exact component={PhoneLogin} />
		<Route path={"/verify-phone/:number"} exact component={VerifyPhone} />
		<Route path={"/social-login"} exact component={SocialLogin} />
		<Redirect path={"*"} to={"/"} />
	</Switch>
);

const LoggedInRoutes: React.FC = () => (
	<Switch>
		<Route path={"/"} exact component={Home} />
		<Route path={"/ride"} exact component={Ride} />
		<Route path={"/edit-account"} exact component={EditAccount} />
		<Route path={"/setting"} exact component={Settings} />
		<Route path={"/places"} exact component={Places} />
		<Route path={"/add-place"} exact component={AddPlace} />
		<Route path={"/find-address"} exact component={FindAddress} />
		<Redirect path={"*"} to={"/"} />
	</Switch>
);

>>>>>>> 58f39ad... [#1] router enviroment setting
AppPresenter.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
};

=======
>>>>>>> c002051... [#4] refactored with lint
export default AppPresenter;
