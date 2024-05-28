"use client";
import { useState, useEffect } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("http://localhost:3001/api/exams");
      const data = await res.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      alert("You have completed the quiz!");
    }
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.imageUrl && (
        <img src={currentQuestion.imageUrl} alt="Question" />
      )}
      <div>
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={handleAnswerChange}
            />
            {option}
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
