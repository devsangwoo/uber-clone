import styled from "styled-components";

export const Container = styled.header`
	background-color: black;
	color: white;
	display: flex;
	height: 60px;
	font-size: 20px;
	font-weight: lighter;
	/* horizontally centered */
	align-items: center;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	margin-bottom: 50px;
	padding: 0 20px;
	& svg {
		fill: white;
	}
`;

export const Title = styled.h2`
	margin-left: 20px;
`;
