import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
	const navigate = useNavigate();

	return (
		<button
			className="start-button"
			onClick={() => {
				navigate("/questions");
			}}
		>
			Start Quiz
		</button>
	);
};

export default Start;
