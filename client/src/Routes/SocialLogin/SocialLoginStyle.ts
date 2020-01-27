import styled from "styled-components";
import BackArrow from "../../Components/BackArrow";

export const Container = styled.div`
	margin-top: 30px;
	padding: 50px 20px;
`;

export const Title = styled.h2`
	font-size: 25px;
	margin-bottom: 40px;
`;

export const Link = styled.span`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const Icon = styled.span`
	margin-right: 10px;
`;

export const BackArrowExtended = styled(BackArrow)`
	position: absolute;
	top: 20px;
	left: 20px;
`;
