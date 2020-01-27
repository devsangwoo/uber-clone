import styled from "styled-components";

interface IProps {
	mine: boolean;
}

export const Container = styled.div<IProps>`
	background-color: ${props =>
		props.mine ? props.theme.blueColor : props.theme.greyColor};
	color: white;
	padding: 10px 20px;
	border-radius: 20px;
	align-self: ${props => (props.mine ? "flex-end" : "flex-start")};
	border-bottom-right-radius: ${props => (props.mine ? "0px" : "20px")};
	border-bottom-left-radius: ${props => (!props.mine ? "0px" : "20px")};
	margin-bottom: 10px;
`;
