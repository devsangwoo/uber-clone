import styled from "styled-components";
import Button from "../../Components/Button";

export const Contaier = styled.div``;

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

export const RequestButton = styled(Button)`
	position: absolute;
	bottom: 20px;
	z-index: 1;
	width: 50%;
	right: 0;
	left: 0;
	margin: auto;
`;
