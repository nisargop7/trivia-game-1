import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const Question = ({ category, difficulty, question }) => {
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'easy';
      case 'medium':
        return 'medium';
      case 'hard':
        return 'hard';
      default:
        return '';
    }
  };

  return (
    <>
    <header className="App-header">
        <h4>** &nbsp; Quiz It &nbsp; **</h4>
        </header>
    <Card>
      <Card.Header>
        <div className='label-class'>
          <strong>Category:</strong> <span>{category}</span>
        </div>
        <div className='label-class'>
          <strong>Difficulty:</strong> <span className={getDifficultyClass(difficulty)}>{difficulty}</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: question }} />
      </Card.Body>
    </Card>
    </>
  );
};

Question.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default Question;
