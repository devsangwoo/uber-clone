import styled from "styled-components";

export const Input = styled.input`
	border: none;
	border-bottom: 2px solid ${props => props.theme.greyColor};
	font-size: 20px;
	width: 100%;
	padding: 20px 0px 3px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	transition: border-bottom 0.1s linear;
	&:-webkit-autofill {
		box-shadow: 0 0 0px 1000px white inset !important;
	}
	&:focus {
		border-bottom-color: #2c3e50;
		outline: none;
	}
	&::placeholder {
		color: ${props => props.theme.greyColor};
		font-weight: 300;
	}
`;
