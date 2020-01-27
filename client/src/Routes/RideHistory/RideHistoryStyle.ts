import styled from "styled-components";

export const Container = styled.div`
	margin: 100px 5%;
	/* padding: 0 10%; */
	display: block;
	justify-content: center;
	align-items: center;
`;

export const ToggleSwitch = styled.label`
	position: fixed;
	margin: auto;
	bottom: 10px;
	height: 50px;
	left: 35%;
	right: 35%;
	background-color: ${props => props.theme.greyColor};
	color: white;
`;

export const ToggleButton = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

interface IProps {
	isDriver: boolean;
}
export const Slider = styled.span<IProps>`
	background-color: black;
	color: white;
	margin: 2px 0;
	height: 90%;
	width: 80%;
	cursor: pointer;
	float: ${props => (props.isDriver ? "left" : "right")};
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
`;
