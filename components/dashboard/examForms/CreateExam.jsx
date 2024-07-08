"use client";
import Notification from "@/components/widgets/Notification";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateExam({ categories }) {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [messages, setMessages] = useState({
    message: "",
    error: "",
  });

  const [examTitle, setExamTitle] = useState({
    title: "",
    category: "",
  });
  const [questions, setQuestions] = useState([
    {
      image: null,
      answers: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    },
  ]);
  const [errors, setErrors] = useState({});
  const userId = useSelector((state) => state.auth.user?._id);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        image: null,
        answers: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      },
    ]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleExplanationChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    const updatedQuestions = [...questions];
    updatedQuestions[index].image = file;
    setQuestions(updatedQuestions);
  };

  const validate = () => {
    const newErrors = {};
    if (!examTitle.title) newErrors.examTitle = "Exam title is required";
    if (!examTitle.category) newErrors.category = "Exam category is required";
    questions.forEach((question, qIndex) => {
      if (!question.image)
        newErrors[`questionImage${qIndex}`] = "Image is required";
      question.answers.forEach((answer, aIndex) => {
        if (!answer)
          newErrors[`answer${qIndex}${aIndex}`] = "Answer is required";
      });
      if (!question.correctAnswer)
        newErrors[`correctAnswer${qIndex}`] = "Correct answer is required";
      if (!question.explanation)
        newErrors[`explanation${qIndex}`] = "Explanation is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsNotificationOn(true);

    const formData = new FormData();
    formData.append("title", examTitle.title);
    formData.append("category", examTitle.category);
    formData.append("user", userId);
    questions.forEach((question, index) => {
      formData.append(`questions`, question.image);
    });
    formData.append(
      "questionsData",
      JSON.stringify(
        questions.map((q) => ({
          answers: q.answers,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        }))
      )
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/create-exam`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages({ ...messages, message: data.message, error: "" });

        setExamTitle({
          title: "",
          category: "",
        });

        setQuestions([
          {
            image: null,
            answers: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
          },
        ]);

        setErrors({});
      } else {
        console.error("Failed to save exam:", response.statusText);
        setMessages({ ...messages, message: data.message, error: "" });
      }
    } catch (error) {
      console.error("Error saving exam:", error);
      setMessages({ ...messages, message: data.message, error: "" });
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-8 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold my-3">Create Exam</h1>
        <p className="text-sm text-gray-600">Enter exam details</p>
      </div>
      <form className="space-y-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="examTitle" className="block text-sm text-gray-600">
              Exam Title
            </label>
            <input
              type="text"
              id="examTitle"
              value={examTitle.title}
              onChange={(e) =>
                setExamTitle({ ...examTitle, title: e.target.value })
              }
              placeholder="Exam Title"
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
            />
            {errors.examTitle && (
              <p className="text-red-500 text-sm">{errors.examTitle}</p>
            )}
            <label htmlFor="examTitle" className="block text-sm text-gray-600">
              Exam Category
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              type="text"
              name="category"
              id="category"
              autoComplete="category"
              required
              value={examTitle.category}
              onChange={(e) =>
                setExamTitle({ ...examTitle, category: e.target.value })
              }
            >
              <option value="" disabled>
                Choose category
              </option>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    className="text-secondary-900"
                    value={category._id}
                  >
                    {category.title.replace("-", " ")}
                  </option>
                ))}
            </select>
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="space-y-8">
              <label className="block mb-2 text-md font-bold text-gray-600">
                Question {qIndex + 1}
              </label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(qIndex, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
              />
              {errors[`questionImage${qIndex}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`questionImage${qIndex}`]}
                </p>
              )}
              {question.answers.map((answer, aIndex) => (
                <div key={aIndex} className="space-y-2">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(qIndex, aIndex, e.target.value)
                    }
                    placeholder={`Answer ${aIndex + 1}`}
                    className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                  />
                  {errors[`answer${qIndex}${aIndex}`] && (
                    <p className="text-red-500 text-sm">
                      {errors[`answer${qIndex}${aIndex}`]}
                    </p>
                  )}
                </div>
              ))}
              <div className="space-y-2">
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border rounded-md focus:outline-green-500"
                >
                  <option value="">Select Correct Answer</option>
                  {question.answers.map((_, aIndex) => (
                    <option key={aIndex} value={aIndex}>{`Answer ${
                      aIndex + 1
                    }`}</option>
                  ))}
                </select>
                {errors[`correctAnswer${qIndex}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`correctAnswer${qIndex}`]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <textarea
                  value={question.explanation}
                  onChange={(e) =>
                    handleExplanationChange(
                      qIndex,
                      "explanation",
                      e.target.value
                    )
                  }
                  placeholder="explanation"
                  className="w-full h-40 px-3 py-2 border rounded-md focus:outline-green-500"
                />
                {errors[`explanation${qIndex}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`explanation${qIndex}`]}
                  </p>
                )}
              </div>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteQuestion(qIndex)}
                  className="text-white py-2 px-4 mt-4 font-semibold rounded-xl bg-red-500 hover:bg-red-400 duration-300"
                >
                  Delete Question
                </button>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={addQuestion}
            className="rounded-full text-white mb-8 font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-full text-white ml-0 sm:ml-8 font-semibold bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
          >
            Save Exam
          </button>
        </div>
      </form>
      <Notification
        isNotificationOn={isNotificationOn}
        onNotificationClose={setIsNotificationOn}
        messages={messages}
      />
    </div>
  );
}
