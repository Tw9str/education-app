// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import OverlayAlert from "@/components/widgets/OverlayAlert";
// import Timer from "@/app/(home)/trial/Timer";
// import ExamSvg from "@/app/(home)/trial/ExamSvg";
// import {
//   CarbonNextOutline,
//   FormkitSubmit,
//   MaterialSymbolsPauseOutline,
//   MaterialSymbolsPlayArrowOutline,
// } from "@/app/(home)/trial/Icons";

// export default function ExamViewer({ exam }) {
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [isPaused, setIsPaused] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);

//   const handleAnswerSelect = (value) => {
//     setSelectedAnswers((prevSelected) =>
//       prevSelected.includes(value)
//         ? prevSelected.filter((answer) => answer !== value)
//         : [...prevSelected, value]
//     );
//   };

//   const handlePauseButton = () => {
//     setIsPaused((prev) => !prev);
//   };

//   const calculatePoints = (selectedAnswers, question) => {
//     const correctAnswers = question.correctAnswers.map(String);
//     const points = question.points;
//     const totalCorrect = correctAnswers.length;
//     const allAnswers = question.answers.map(String);

//     const pointsPerCorrectAnswer = points / totalCorrect;

//     const correctCount = selectedAnswers.filter((answer) =>
//       correctAnswers.includes(answer)
//     ).length;

//     const incorrectCount = selectedAnswers.filter(
//       (answer) => !correctAnswers.includes(answer)
//     ).length;

//     const allSelected = selectedAnswers.length === allAnswers.length;

//     if (allSelected) {
//       return 0;
//     }

//     const penalty = ((-0.66 * points) / totalCorrect) * incorrectCount;

//     if (correctCount === totalCorrect && incorrectCount === 0) {
//       return points;
//     }

//     if (correctCount === 0) {
//       return 0;
//     }

//     const scoreFromCorrectAnswers = pointsPerCorrectAnswer * correctCount;

//     const totalScore = scoreFromCorrectAnswers + penalty;

//     return Math.max(totalScore, 0);
//   };

//   const handleNextQuestion = () => {
//     const currentQuestion = exam.questions[currentQuestionIndex];
//     const points = calculatePoints(selectedAnswers, currentQuestion);
//     setTotalPoints((prevPoints) => prevPoints + points);
//     setAnswers((prev) => [...prev, selectedAnswers]);
//     setSelectedAnswers([]);
//     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleSubmit = async () => {
//     const currentQuestion = exam.questions[currentQuestionIndex];
//     const points = calculatePoints(selectedAnswers, currentQuestion);
//     const finalPoints = totalPoints + points;
//     setAnswers((prev) => [...prev, selectedAnswers]);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE}/submit-answers`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             answers: [...answers, selectedAnswers],
//             points: finalPoints,
//           }),
//         }
//       );
//       const result = await response.json();
//       console.log("Submission result:", result);
//       // Handle the result (e.g., show a success message, navigate to another page, etc.)
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     }

//     // Reset state variables after submission
//     setSelectedAnswers([]);
//     setIsPaused(false);
//     setCurrentQuestionIndex(0);
//     setAnswers([]);
//     setTotalPoints(0);
//   };

//   const currentQuestion = exam.questions[currentQuestionIndex];
//   const isSubmitDisabled = selectedAnswers.length === 0;
//   const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-lg">
//       <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg">
//         <div className="flex flex-col justify-center basis-1/2 gap-4">
//           <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
//             <span className="uppercase">points: {currentQuestion?.points}</span>
//             <Timer />
//             <span>
//               {currentQuestionIndex + 1} of {exam.questions.length}
//             </span>
//           </div>
//           <Image
//             src={`${process.env.NEXT_PUBLIC_API_BASE}/questions/${currentQuestion?.image}`}
//             width={800}
//             height={800}
//             alt=""
//           />
//           <ul className="flex flex-col gap-2 text-white">
//             {currentQuestion?.answers.map((answer, index) => (
//               <li
//                 key={index}
//                 className={`${
//                   selectedAnswers.includes(index.toString())
//                     ? "bg-orange-500"
//                     : "bg-green-500"
//                 } ${
//                   !selectedAnswers.includes(index.toString()) &&
//                   "hover:bg-green-400"
//                 } rounded-lg p-4 border border-gray-100 cursor-pointer duration-300`}
//                 onClick={() => handleAnswerSelect(index.toString())}
//               >
//                 <label className="cursor-pointer" htmlFor={index}>
//                   {String.fromCharCode(65 + index)}. {answer}
//                 </label>
//                 <input
//                   className="hidden"
//                   type="checkbox"
//                   name={currentQuestionIndex.toString()}
//                   id={index.toString()}
//                   value={index.toString()}
//                 />
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-center items-center gap-2">
//             <button
//               className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-orange-500 py-4 px-6 shadow-md hover:bg-orange-300 duration-300"
//               onClick={handlePauseButton}
//             >
//               {isPaused ? (
//                 <MaterialSymbolsPlayArrowOutline />
//               ) : (
//                 <MaterialSymbolsPauseOutline />
//               )}
//               {isPaused ? "Continue" : "Pause"}
//             </button>
//             {isLastQuestion ? (
//               <button
//                 className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
//                 disabled={isSubmitDisabled}
//                 onClick={handleSubmit}
//               >
//                 <FormkitSubmit />
//                 Submit
//               </button>
//             ) : (
//               <button
//                 className="flex justify-center items-center gap-2 rounded-lg uppercase text-white bg-green-500 py-4 px-6 shadow-md hover:bg-orange-500 duration-300 disabled:bg-green-300"
//                 disabled={isSubmitDisabled}
//                 onClick={handleNextQuestion}
//               >
//                 <CarbonNextOutline />
//                 Next
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="basis-1/2">
//           <ExamSvg />
//         </div>
//       </div>
//       {isPaused ? (
//         <OverlayAlert
//           title="Pause Exam"
//           description="Are you sure you want to pause the exam?"
//         />
//       ) : null}
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import Image from "next/image";
import OverlayAlert from "@/components/widgets/OverlayAlert";
import Timer from "@/app/(home)/trial/Timer";
import ExamSvg from "@/app/(home)/trial/ExamSvg";
import {
  CarbonNextOutline,
  FormkitSubmit,
  MaterialSymbolsPauseOutline,
  MaterialSymbolsPlayArrowOutline,
} from "@/app/(home)/trial/Icons";
import EndScreen from "./EndScreen";

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

  const calculatePoints = (selectedAnswers, question) => {
    const correctAnswers = question.correctAnswers.map(String); // Ensure correct answers are strings
    const points = question.points;
    const totalCorrect = correctAnswers.length;
    const allAnswers = question.answers.map(String);

    // Points per correct answer
    const pointsPerCorrectAnswer = points / totalCorrect;

    // Number of correct answers selected
    const correctCount = selectedAnswers.filter((answer) =>
      correctAnswers.includes(answer)
    ).length;

    // Number of incorrect answers selected
    const incorrectCount = selectedAnswers.filter(
      (answer) => !correctAnswers.includes(answer)
    ).length;

    // Check if all possible answers are selected
    const allSelected = selectedAnswers.length === allAnswers.length;

    // If all answers are selected, the score should be zero
    if (allSelected) {
      return 0;
    }

    // Calculate penalty for incorrect answers
    const penalty = ((-0.66 * points) / totalCorrect) * incorrectCount;

    // If all correct answers are selected, user gets full points if no incorrect answers are selected
    if (correctCount === totalCorrect && incorrectCount === 0) {
      return points;
    }

    // If no correct answers are selected, the score is zero
    if (correctCount === 0) {
      return 0;
    }

    // Calculate score based on the number of correct answers selected
    const scoreFromCorrectAnswers = pointsPerCorrectAnswer * correctCount;

    // Calculate total score considering penalties
    const totalScore = scoreFromCorrectAnswers + penalty;

    // Ensure score is not negative
    return Math.max(totalScore, 0);
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

      // Show total points to the user before resetting states
    } catch (error) {
      console.error("Error submitting answers:", error);
    }

    // Reset states after showing the result
    setTotalPoints(finalPoints);
    setShowTotalPoints(true);
    setSelectedAnswers([]);
    setIsPaused(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isSubmitDisabled = selectedAnswers.length === 0;
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="grid xl:grid-cols-2 justify-center items-center p-4 border border-gray-100 rounded-lg">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-around items-center gap-2 rounded-lg text-white bg-orange-500 p-4">
            <span className="uppercase">points: {currentQuestion?.points}</span>
            <Timer />
            <span>
              {currentQuestionIndex + 1} of {exam.questions.length}
            </span>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE}/questions/${currentQuestion?.image}`}
            width={800}
            height={800}
            alt=""
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
        <div className="hidden xl:block">
          <ExamSvg />
        </div>
      </div>
      {isPaused && (
        <OverlayAlert
          title="Pause Exam"
          description="Are you sure you want to pause the exam?"
        />
      )}
      {showTotalPoints && <EndScreen totalPoints={totalPoints} />}
    </div>
  );
}
