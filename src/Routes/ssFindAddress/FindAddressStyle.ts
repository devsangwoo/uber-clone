import { Map } from "google-maps-react";
import styled from "styled-components";
import Input from "../../Components/Input";

export const Container = styled.div`
	display: flex;
`;

export const MapExtend = styled(Map)`
	height: 90%;
`;

export const InputExtend = styled(Input)``;

export const MapDiv = styled.div`
	/* position: absolute;
	top: 0;
	left: 0; */
	height: 100%;
	width: 100%;
	/* z-index: 1; */
`;
