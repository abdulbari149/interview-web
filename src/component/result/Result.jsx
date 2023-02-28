import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	return (
		<div>
			<h1>Name: {state?.user?.name ?? ""}</h1>
			<h1>CNIC: {state?.user?.cnic ?? ""}</h1>
			<h3>No Of Correct answers: {state?.noOfCorrectAnswers}</h3>
			<h3>Score: {state?.score}</h3>
			<button
				onClick={() => {
					localStorage.removeItem("user_id");
					navigate("/");
				}}
			>
				Retry
			</button>
		</div>
	);
};

export default Result;
