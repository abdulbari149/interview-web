import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [cnic, setCnic] = useState("");
	const [nameError, setNameError] = useState("");
	const [cnicError, setCnicError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!name) {
			setNameError("Please enter your name");
			return;
		} else {
			setNameError("");
		}
		if (!cnic) {
			setCnicError("Please enter your CNIC");
			return;
		} else {
			setCnicError("");
		}

		try {
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, {
				name,
				cnic,
			});
			console.log(response.data);
			if (response.status === 201) {
				localStorage.setItem("user_id", response.data.id.toString());
				navigate("/start");
			} else {
				throw new Error(response.data?.message ?? '');
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit} className="user-info-form">
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
					className="input-field"
				/>
				<div className="error-message">{nameError}</div>

				<label htmlFor="cnic">CNIC:</label>
				<input
					type="text"
					id="cnic"
					value={cnic}
					onChange={(event) => setCnic(event.target.value)}
					className="input-field"
				/>
				<div className="error-message">{cnicError}</div>

				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
		</>
	);
};

export default Form;
