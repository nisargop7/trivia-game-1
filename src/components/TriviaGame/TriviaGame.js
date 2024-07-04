import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import Question from "./Question";
import AnswerForm from "./AnswerForm";

const TriviaGame = () => {
  const [questions, setQuestions] = useState([]);
  const [answerMessage, setAnswerMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [isNextLoading, setIsNextLoading] = useState(false); // Loading state for next question

  // Fetch questions from API on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=1");
      setQuestions(response.data.results);
      setAnswerMessage(""); // Clear answer message
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = (userAnswer) => {
    if (isSubmitting) return; // Prevent multiple submissions
    if (!userAnswer.trim()) {
      setAnswerMessage("Please enter your answer.");
      return;
    }

    setIsSubmitting(true);

    const correctAnswer = questions[0].correct_answer; // Use the first question in the list
    const trimmedUserAnswer = userAnswer.trim().toLowerCase();
    const trimmedCorrectAnswer = correctAnswer.trim().toLowerCase();

    if (trimmedUserAnswer === trimmedCorrectAnswer) {
      setAnswerMessage("Correct!");
      setIsNextLoading(true); // Show loader for next question
      setTimeout(() => {
        setQuestions((prevQuestions) => prevQuestions.slice(1)); // Remove the first question
        setIsNextLoading(false); // Hide loader for next question
        setIsSubmitting(false);
        setAnswerMessage(""); // Clear the answer message
        if (questions.length === 1) {
          setAnswerMessage("Quiz completed! Fetching new questions...");
          fetchQuestions(); 
        }
      }, 1000); 
    } else {
      setAnswerMessage("Incorrect. The correct answer is: " + correctAnswer);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
    <Container className="mt-5">
      {questions?.length > 0 && (
        <>
          {isNextLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          ) : (
            <>
              <Question 
                category={questions[0]?.category}
                difficulty={questions[0]?.difficulty}
                question={questions[0]?.question}
              />
              <AnswerForm onSubmit={handleAnswerSubmit} disabled={isSubmitting} />
            </>
          )}
          {answerMessage && (
            <Alert
              variant={answerMessage.includes("Correct") ? "success" : "danger"}
              className="mt-3"
            >
              {answerMessage}
            </Alert>
          )}
        </>
      )}
    </Container>
    </>
  );
};

export default TriviaGame;
