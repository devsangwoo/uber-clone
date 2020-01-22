import styled from "styled-components";
import Button from "../../Components/Button";
// import IconButton from "../../Components/IconButton";

export const RideContainer = styled.div`
	padding: 30px 40px;
`;

export const Container = styled.div``;

export const Title = styled.h4`
	font-weight: 800;
	margin-top: 30px;
	margin-bottom: 10px;
	&:first-child {
		margin-top: 0;
	}
`;

export const Data = styled.span`
	margin-left: 5px;
	color: ${props => props.theme.greyColor};
`;

export const Img = styled.img`
	float: left;
	border-radius: 50%;
	margin-right: 20px;
	max-width: 50px;
	height: 50px;
`;

export const IconButton = styled.div`
	float: right;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	cursor: pointer;
`;

export const Info = styled.div`
	padding: 10px 20px;
`;

export const User = styled.div`
	float: left;
	display: block;
	align-items: center;
	margin-bottom: 20px;
`;

export const UserName = styled.h2`
	margin: 5px 0px;
	font-weight: bold;
`;

export const UserPhone = styled.p`
	margin-top: 2px;
	font-weight: lighter;
	color: ${props => props.theme.greyColor};
`;

export const Buttons = styled.div`
	margin: 20px 0px;
	padding: 0 30px;
`;

export const ButtonOnCancel = styled(Button)`
	margin-top: 5px;
	background-color: red;
`;
