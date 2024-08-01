"use client";
import { useState } from "react";
import Image from "next/image";
import EndScreen from "./EndScreen";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import Timer from "@/app/(home)/trial/Timer";
import { calculatePoints } from "@/utils/calculatePoints";
import ExamSvg from "@/app/(home)/trial/ExamSvg";
import {
  CarbonNextOutline,
  FormkitSubmit,
  MaterialSymbolsPauseOutline,
  MaterialSymbolsPlayArrowOutline,
} from "@/app/(home)/trial/Icons";

export default function ExamViewer({ exam }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showTotalPoints, setShowTotalPoints] = useState(false);

  const handleAnswerSelect = (value) => {
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((answer) => answer !== value)
        : [...prevSelected, value]
    );
  };

  const handlePauseButton = () => {
    setIsPaused((prev) => !prev);
  };

  const handleNextQuestion = () => {
    const currentQuestion = exam.questions[currentQuestionIndex];
    const points = calculatePoints(selectedAnswers, currentQuestion);
    setTotalPoints((prevPoints) => prevPoints + points);
    setAnswers((prev) => [...prev, selectedAnswers]);
    setSelectedAnswers([]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    const currentQuestion = exam.questions[currentQuestionIndex];
    const points = calculatePoints(selectedAnswers, currentQuestion);
    const finalPoints = totalPoints + points;
    setAnswers((prev) => [...prev, selectedAnswers]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/submit-answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: [...answers, selectedAnswers],
            points: finalPoints,
          }),
        }
      );
      const result = await response.json();
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    setTotalPoints(finalPoints);
    setShowTotalPoints(true);
    setSelectedAnswers([]);
    setIsPaused(false);
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isSubmitDisabled = selectedAnswers.length === 0;
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div
        className={`grid justify-center items-center p-4 border border-gray-100 rounded-lg`}
      >
        {showTotalPoints ? (
          <EndScreen
            exam={exam}
            totalPoints={totalPoints}
            selectedAnswers={answers}
          />
        ) : (
          <div className="flex flex-col justify-center gap-4">
            <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
              <span className="uppercase">
                points: {currentQuestion?.points}
              </span>
              <Timer />
              <span>
                {currentQuestionIndex + 1} of {exam.questions.length}
              </span>
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE}/questions/${currentQuestion?.image}`}
              width={800}
              height={800}
              alt="question"
            />
            <ul className="flex flex-col gap-2 text-white">
              {currentQuestion?.answers.map((answer, index) => (
                <li
                  key={index}
                  className={`${
                    selectedAnswers.includes(index.toString())
                      ? "bg-orange-500"
                      : "bg-green-500"
                  } ${
                    !selectedAnswers.includes(index.toString()) &&
                    "hover:bg-green-400"
                  } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
                  onClick={() => handleAnswerSelect(index.toString())}
                >
                  <label className="cursor-pointer" htmlFor={index}>
                    {String.fromCharCode(65 + index)}. {answer}
                  </label>
                  <input
                    className="hidden"
                    type="checkbox"
                    name={currentQuestionIndex.toString()}
                    id={index.toString()}
                    value={index.toString()}
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center gap-2">
              <button
                className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-orange-500 py-4 px-6 shadow-md hover:bg-orange-300 duration-300"
                onClick={handlePauseButton}
              >
                {isPaused ? (
                  <MaterialSymbolsPlayArrowOutline />
                ) : (
                  <MaterialSymbolsPauseOutline />
                )}
                {isPaused ? "Continue" : "Pause"}
              </button>
              {isLastQuestion ? (
                <button
                  className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
                  disabled={isSubmitDisabled}
                  onClick={handleSubmit}
                >
                  <FormkitSubmit />
                  Submit
                </button>
              ) : (
                <button
                  className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
                  disabled={isSubmitDisabled}
                  onClick={handleNextQuestion}
                >
                  <CarbonNextOutline />
                  Next
                </button>
              )}
            </div>
          </div>
        )}
        {/* <div className={`${showTotalPoints ? "hidden" : "xl:block"} hidden`}>
          <ExamSvg />
        </div> */}
      </div>
      {isPaused && (
        <OverlayAlert
          title="Pause Exam"
          description="Are you sure you want to pause the exam?"
          onConfirm={""}
          onCancel={""}
          confirmButtonColor="bg-orange-400"
          iconColor="text-orange-400"
        />
      )}
    </div>
  );
}
