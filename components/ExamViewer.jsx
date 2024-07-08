"use client";
import React, { useState } from "react";
import Image from "next/image";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import Timer from "@/app/(home)/trial/Timer";
import ExamSvg from "@/app/(home)/trial/ExamSvg";
import {
  CarbonNextOutline,
  MaterialSymbolsPauseOutline,
  MaterialSymbolsPlayArrowOutline,
} from "@/app/(home)/trial/Icons";

export default function ExamViewer({ exam }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };

  const handlePauseButton = () => {
    setIsPaused((prev) => !prev);
  };

  const handleNextQuestion = () => {
    // Reset selected answer for the next question
    setSelectedAnswer(null);
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isSubmitDisabled = selectedAnswer === null;
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg">
        <div className="flex flex-col justify-center basis-1/2 gap-4">
          <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
            <Timer />
            <span>
              {currentQuestionIndex + 1} of {exam.questions.length}
            </span>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE}/${currentQuestion?.image}`}
            width={800}
            height={800}
            alt=""
          />
          <ul className="flex flex-col gap-2 text-white">
            {currentQuestion?.answers.map((answer, index) => (
              <li
                key={index}
                className={`${
                  selectedAnswer === index.toString()
                    ? "bg-orange-500"
                    : "bg-green-500"
                } ${
                  selectedAnswer !== index.toString() && "hover:bg-green-400"
                } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
                onClick={() => handleAnswerSelect(index.toString())}
              >
                <label className="cursor-pointer" htmlFor={index}>
                  {String.fromCharCode(65 + index)}. {answer}
                </label>
                <input
                  className="hidden"
                  type="radio"
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
            <button
              className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
              disabled={isSubmitDisabled || isLastQuestion}
              onClick={handleNextQuestion}
            >
              <CarbonNextOutline />
              Next
            </button>
          </div>
        </div>
        <div className="basis-1/2">
          <ExamSvg />
        </div>
      </div>
      {isPaused ? (
        <OverlayAlert
          title="Pause Exam"
          description="Are you sure you want to pause the exam?"
        />
      ) : null}
    </div>
  );
}
