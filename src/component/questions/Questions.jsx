import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Questions.css";

const TIMEVALUE = 180;

const Questions = () => {
	const [questions, setQuestions] = useState([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [answers, setAnswers] = useState([]);

	function handleSelectButton(event) {
		console.log(event.target.value);
		setSelectedOption(event.target.value);
	}

	useEffect(() => {
		fetchQuestions();
	}, []);

	const fetchQuestions = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/quiz`);
			console.log(response.data);
			setQuestions(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleNext = () => {
		// if answer is not select
		if (selectedOption === null) {
			alert("You havent selected anything");
			return;
		}
		setAnswers((prevAnswers) => {
			return [
				...prevAnswers,
				{
					question_id: questions[questionIndex].id,
					option_id: selectedOption,
				},
			];
		});
		setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
		setSelectedOption(null);
	};
	const navigate = useNavigate();
	const handleSubmit = async () => {
		try {
			const data = [
				...answers,
				{
					question_id: questions[questionIndex].id,
					option_id: selectedOption,
				},
			];
			await submitResult(data);
		} catch (error) {
			console.log(error);
		}
	};

	const submitResult = async (data) => {
		const user_id = parseInt(localStorage.getItem("user_id"), 10);
		const response = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/quiz/result`,
			{ answers: data, user_id }
		);
		navigate("/result", { state: response.data });
		setAnswers([]);
		localStorage.removeItem("user_id")
	};

	const onComplete = useCallback(() => {
		const data = [...answers];
		console.log(answers)
		debugger;
		if (selectedOption !== null) {
			data.push({
				question_id: questions[questionIndex].id,
				option_id: selectedOption,
			});
		}
		submitResult(data);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption, answers]);

	const [counter, setCounter] = useState(TIMEVALUE);
	const counterRef = useRef(TIMEVALUE);

	useEffect(() => {
		const interval = setInterval(() => {
			if (counterRef.current === 0) {
				onComplete();
				clearInterval(interval);
			} else {
				setCounter((counter) => counter - 1);
				counterRef.current--;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onComplete]);

	return (
		<div>
			<div>Timer: {counter}</div>
			{questions.length === 0 ? (
				<p>Loading ....</p>
			) : (
				<>
					<div className="question">
						<p>{questions[questionIndex]?.question}</p>
						<form>
							{questions[questionIndex].options.map((option) => {
								return (
									<div key={option.id}>
										<input
											type="radio"
											id={"option-" + option.id}
											value={option.id}
											checked={+selectedOption === +option.id}
											onChange={handleSelectButton}
										/>
										<label htmlFor={"option-" + option.id}>{option.name}</label>
									</div>
								);
							})}
						</form>
					</div>

					<div className="question_buttons">
						<button
							onClick={handleNext}
							disabled={questionIndex === questions.length - 1}
						>
							Next
						</button>
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Questions;
