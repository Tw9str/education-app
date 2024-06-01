"use client";
import React, { useState } from "react";
import Image from "next/image";
import Timer from "./Timer";
import ExamSvg from "./ExamSvg";
import {
  CarbonNextOutline,
  MaterialSymbolsPauseOutline,
  MaterialSymbolsPlayArrowOutline,
} from "./Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";

export default function Test() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
  };
  const handlePauseButton = () => {
    setIsPaused((prev) => !prev);
  };

  const isSubmitDisabled = selectedAnswer === null;

  return (
    <main className="px-4 sm:px-6 md:px-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto mt-20 p-6 sm:px-6 md:px-8 border border-gray-100 rounded-lg">
        <div className="flex flex-col justify-center items-ccenter gap-4">
          <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
            <Timer />
            <span>1 of 15</span>
          </div>
          <Image src="/question.png" width={800} height={800} alt="" />
          <ul className="flex flex-col gap-2 text-white">
            <li
              className={`${
                selectedAnswer === "1" ? "bg-orange-500" : "bg-green-500"
              } ${
                selectedAnswer !== "1" && "hover:bg-green-400"
              } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
              onClick={() => handleAnswerSelect("1")}
            >
              <label className="cursor-pointer" htmlFor="1">
                {String.fromCharCode(65)}. Dacă vectorul x este format din
                valorile 1, 2, 3, …, 10.
              </label>
              <input
                className="hidden"
                type="radio"
                name="1"
                id="1"
                value="1"
              />
            </li>
            <li
              className={`${
                selectedAnswer === "2" ? "bg-orange-500" : "bg-green-500"
              } ${
                selectedAnswer !== "2" && "hover:bg-green-400"
              } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
              onClick={() => handleAnswerSelect("2")}
            >
              <label className="cursor-pointer" htmlFor="2">
                {String.fromCharCode(66)}. Dacă vectorul x este strict
                crescător.
              </label>
              <input
                className="hidden"
                type="radio"
                name="1"
                id="2"
                value="2"
              />
            </li>
            <li
              className={`${
                selectedAnswer === "3" ? "bg-orange-500" : "bg-green-500"
              } ${
                selectedAnswer !== "3" && "hover:bg-green-400"
              } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
              onClick={() => handleAnswerSelect("3")}
            >
              <label className="cursor-pointer" htmlFor="3">
                {String.fromCharCode(67)}. Dacă vectorul x nu are elemente
                negative.
              </label>
              <input
                className="hidden"
                type="radio"
                name="1"
                id="3"
                value="3"
              />
            </li>
            <li
              className={`${
                selectedAnswer === "4" ? "bg-orange-500" : "bg-green-500"
              } ${
                selectedAnswer !== "4" && "hover:bg-green-400"
              } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
              onClick={() => handleAnswerSelect("4")}
            >
              <label className="cursor-pointer" htmlFor="4">
                {String.fromCharCode(68)}. Dacă vectorul x nu are elemente
                negative.
              </label>
              <input
                className="hidden"
                type="radio"
                name="1"
                id="4"
                value="4"
              />
            </li>
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
              disabled={isSubmitDisabled}
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
    </main>
  );
}
