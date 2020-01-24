import styled from "styled-components";

export const Container = styled.input`
	width: 100%;
	height: 60px;
	background-color: black;
	color: white;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 16px;
	border: 0;
	font-weight: bold;
	&:active,
	&:focus {
		outline: none;
	}

	&:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}

	&:hover {
		filter: brightness(85%);
	}

	/* &: */
`;
