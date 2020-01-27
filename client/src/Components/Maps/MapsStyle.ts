import styled from "styled-components";
import Button from "../Button";

interface IProps {
	isHome: boolean;
}

export const Map = styled.div<IProps>`
	position: ${props => props.isHome && "absolute"};
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 0;
`;

export const Center = styled.div`
	position: absolute;
	width: 40px;
	height: 40px;
	z-index: 2;
	font-size: 30px;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const ExtendedButton = styled(Button)`
	position: absolute;
	bottom: 50px;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 10;
	height: auto;
	width: 80%;
`;
