import styled from "styled-components";

export const Container = styled.div`
	margin: 5% 0;
	border: 0.5px solid ${props => props.theme.greyColor};
	display: block;
	justify-content: center;
	align-items: center;
	height: 600px;
`;

export const MapContainer = styled.div`
	display: block;
	justify-content: center;
	align-items: center;
	border: 0.5px solid ${props => props.theme.greyColor};
	width: 100%;
	height: 80%;
`;

export const InfoContainer = styled.div`
	padding: 3% 5%;
	width: 90%;
	height: 20%;
`;

export const Title = styled.h4`
	font-weight: 800;
	margin-top: 10px;
	margin-bottom: 3px;
	&:first-child {
		margin-top: 0;
	}
`;

export const Data = styled.span`
	margin-left: 5px;
	color: ${props => props.theme.greyColor};
`;

export const Date = styled.div`
	height: 5%;
	position: relative;
	float: right;
	top: 1%;
	right: 1%;
	color: ${props => props.theme.greyColor};
	font-weight: lighter;
`;

export const Status = styled.div`
	position: absolute;
	left: 5%;
	right: 5%;
	margin: auto;
	background-color: black;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	opacity: 0.7;
	z-index: 5;
`;
