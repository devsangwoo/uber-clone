import styled from "styled-components";

export const Chat = styled.div`
	height: 80vh;
	overflow: scroll;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const InputCont = styled.div`
	padding: 0 20px;
`;

export const Form = styled.form`
	position: absolute;
	bottom: 0px;
	display: inline-flex;
	width: 100%;
`;

export const Input = styled.input`
	float: left;
	height: 50px;
	padding: 10px 20px;
	width: 85%;
	font-size: 20px;
`;

export const Button = styled.button`
	float: left;
	background-color: black;
	color: white;
	width: 15%;
	height: 50px;
	font-size: 15px;
`;
