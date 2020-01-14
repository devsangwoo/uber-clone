import styled from "styled-components";

export const Label = styled.label`
	color: ${props => props.theme.greyColor};
	/* font-weight: lighter; */
	padding: 0px 5px;
	border-left: 4px solid ${props => props.theme.greyColor};
	font-size: 20px;
`;
