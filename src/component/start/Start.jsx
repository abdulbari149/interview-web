import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Start = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	return (
		<div
			className="flex flex-col w-full w-[250px] mx-auto place-content-center place-items-center items-center"
			style={{ width: "200px", margin: "0 auto" }}
		>
			<p>Welcome {state.name}</p>
			<button
				className="submit-button"
				onClick={() => {
					navigate("/questions");
				}}
			>
				Start Quiz
			</button>
		</div>
	);
};

export default Start;
