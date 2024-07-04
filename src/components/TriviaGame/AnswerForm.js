import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AnswerForm = ({ onSubmit, disabled }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [touched, setTouched] = useState(false); 

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(userAnswer);
    setUserAnswer(''); // Reset the input field
    setTouched(false); // Reset the touched state
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>* &nbsp; Enter Your Answer &nbsp; *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={handleInputChange}
          onBlur={handleBlur}
          isInvalid={touched && !userAnswer.trim()} 
          disabled={disabled}
        />
        {touched && !userAnswer.trim() && (
          <div className="fiz-error">
            Please enter your answer.
          </div>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabled} className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default AnswerForm;
