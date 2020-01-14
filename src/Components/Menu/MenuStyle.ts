import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
	height: 100%;
`;

export const Header = styled.div`
	background-color: black;
	height: 20%;
	margin-bottom: 30px;
	padding: 0 20px;
	color: white;
`;

export const LinkExtend = styled(Link)`
	font-size: 22px;
	display: block;
	margin-left: 15px;
	margin-bottom: 25px;
	font-weight: 400;
`;

export const Image = styled.img`
	height: 80px;
	width: 80px;
	background-color: grey;
	border-radius: 40px;
	overflow: hidden;
`;

export const Name = styled.h2`
	font-size: 22px;
	color: white;
	margin-bottom: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const Rating = styled.h5`
	font-size: 18px;
	color: white;
`;

export const Text = styled.span`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 10px;
	height: 100%;
	align-items: center;
`;

interface IToggleProps {
	isDriving: boolean;
}

export const ToggleDriving = styled.button<IToggleProps>`
	-webkit-appearance: none;
	background-color: ${props =>
		props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
	width: 100%;
	color: white;
	font-size: 18px;
	border: 0;
	padding: 15px 0px;
	cursor: pointer;
`;

export const ButtonExtend = styled(Button)`
	position: absolute;
	bottom: 0px;
`;
