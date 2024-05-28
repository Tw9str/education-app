"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ExamForm from "@/components/dashboard/examForms/ExamForm";

export default function CreateExam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Load questions from local storage when the component mounts
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (savedQuestions) {
      setQuestions(savedQuestions);
    }
  }, []);

  // Save questions to local storage whenever the questions state changes
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...currentQuestion.answers];
    newAnswers[index] = value;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      answers: newAnswers,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentQuestion((prevQuestion) => ({
        ...prevQuestion,
        image: e.target.files[0],
      }));
    }
  };

  const saveQuestion = (e) => {
    e.preventDefault();
    setQuestions((prevQuestions) => [...prevQuestions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: "",
      image: null,
    });
    setMessage("Question saved. You can add another question.");
  };

  const submitExam = async () => {
    try {
      const formData = new FormData();
      questions.forEach((question, index) => {
        formData.append(`questions[${index}][question]`, question.question);
        formData.append(
          `questions[${index}][correctAnswer]`,
          question.correctAnswer
        );
        if (question.image) {
          formData.append(`questions[${index}][image]`, question.image);
        }
        question.answers.forEach((answer, idx) => {
          formData.append(`questions[${index}][answers][${idx}]`, answer);
        });
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/exams`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("questions");
        setMessage("Exam submitted successfully.");
        router.push("/dashboard");
      } else {
        setMessage(data.message || "Failed to submit exam. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting exam", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <ExamForm />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Create Exam</h2>
        <form onSubmit={saveQuestion} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Question:</label>
              <input
                type="text"
                name="question"
                value={currentQuestion.question}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              {currentQuestion.answers.map((answer, index) => (
                <div key={index} className="mb-2">
                  <label className="block text-gray-700">
                    Answer {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      value={answer}
                      checked={currentQuestion.correctAnswer === answer}
                      onChange={() =>
                        setCurrentQuestion((prevQuestion) => ({
                          ...prevQuestion,
                          correctAnswer: answer,
                        }))
                      }
                      className="form-radio"
                      required
                    />
                    <span className="ml-2">Mark as correct answer</span>
                  </label>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-gray-700">Upload Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save Question
            </button>
            <button
              type="button"
              onClick={submitExam}
              className="bg-green-500 text-white p-2 rounded"
            >
              Submit Exam
            </button>
          </div>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Current Questions:</h3>
          <ul className="list-disc list-inside">
            {questions.map((q, index) => (
              <li key={index}>{q.question}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
