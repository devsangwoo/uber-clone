import styled from "styled-components";

export const Place = styled.div`
	margin: 15px 0;
	display: flex;
	align-items: center;
	& i {
		font-size: 12px;
	}
`;

export const Container = styled.div`
	margin-left: 10px;
`;

export const Name = styled.span`
	display: block;
`;

export const Icon = styled.span`
	cursor: pointer;
`;

export const Address = styled.span`
	color: ${props => props.theme.greyColor};
	font-size: 14px;
`;
