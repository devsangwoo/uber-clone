import styled from "styled-components";

interface IProps {
	isHome: boolean;
}

export const Map = styled.div<IProps>`
	position: ${props => (props.isHome ? "absolute" : "fixed")};
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 0;
`;
