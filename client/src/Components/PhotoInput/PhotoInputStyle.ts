import styled from "styled-components";

export const Container = styled.div``;

export const Image = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28px;

	&:hover {
		filter: blur(4px);
		-webkit-filter: blur(4px);
		transition: filter 0.5s;
	}
	& img {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160px;
		height: 160px;
		border-radius: 50%;
		overflow: hidden;
	}
`;

export const Input = styled.input`
	color: white;
	opacity: 0;
	height: 1px;
	&:focus {
		outline: none;
	}
`;
