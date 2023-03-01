import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-5">
			<p className="text-[50px] text-center text-blue-500 font-bol">Thanks for attempting the Quiz. We wish you good luck</p>
			<h1 className="text-2xl font-semibold text-black">Name: {state?.user?.name ?? ""}</h1>
			<h1 className="text-2xl font-semibold text-black">CNIC: {state?.user?.cnic ?? ""}</h1>
			<h3 className="text-2xl font-semibold text-black">No of correct answers: {state?.noOfCorrectAnswers}</h3>
			<h3 className="text-2xl font-semibold text-black">Score: {state?.score}</h3>
		</div>
	);
};

export default Result;
