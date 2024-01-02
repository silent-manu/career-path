import { useState } from "react";

import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

import _QUESTIONS from "../questions.js";

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
  timer,
}) {
  const question = _QUESTIONS[index];
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect != null) {
    timer = 2000;
  }

  function handleSelectAnswer(answerText) {
    setAnswer({
      selectedAnswer: answerText,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answerText,
        isCorrect: question.answers[0] === answerText,
      });

      setTimeout(() => {
        onSelectAnswer(answerText);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timer={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{question.text}</h2>
      <Answers
        answers={question.answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
