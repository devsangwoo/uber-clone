import styled from "styled-components";
import Form from "../../Components/Form";
import Input from "../../Components/Input";

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FromExtend = styled(Form)`
	margin: 0px 20px;
	height: 80%;
`;

export const InputExtend = styled(Input)`
	/* padding: 0 0 40px 0; */
	margin-bottom: 35px;
`;

export const Image = styled.img`
	height: 160px;
	width: 160px;
	background-color: grey;
	border-radius: 80px;
	overflow: hidden;
	&:hover {
		filter: blur(4px);
		-webkit-filter: blur(4px);
		transition: filter 0.5s;
	}
	cursor: pointer;
`;

export const PhotoChange = styled.input`
	color: white;
	opacity: 0;
	height: 1px;
	&:focus {
		outline: none;
	}
`;
