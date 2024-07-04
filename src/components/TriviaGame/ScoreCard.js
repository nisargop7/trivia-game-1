// src/components/TriviaGame/ScoreCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ScoreCard = ({ score, totalQuestions, onRestart }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Quiz Completed</Card.Title>
        <Card.Text>
          You scored {score} out of {totalQuestions}
        </Card.Text>
        <Button variant="primary" onClick={onRestart}>
          Restart Quiz
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ScoreCard;
