import React, { useCallback } from "react";
import type { QuestionItem, QuestionAnswer } from "../../types/form-types";

interface QuestionRowProps {
  question: QuestionItem;
  value: QuestionAnswer;
  onChange: (questionId: string, value: QuestionAnswer) => void;
}

const TriStateQuestionRow = React.memo(function TriStateQuestionRow(
  props: QuestionRowProps,
) {
  const { question, value, onChange } = props;

  const handleChange = useCallback(
    (newValue: QuestionAnswer) => {
      // Allow deselecting by clicking the same option
      if (value === newValue) {
        onChange(question.id, null);
      } else {
        onChange(question.id, newValue);
      }
    },
    [onChange, question.id, value],
  );

  return (
    <div
      className="tri-row"
      role="radiogroup"
      aria-labelledby={`question-${question.id}`}
    >
      <p id={`question-${question.id}`} className="tri-row__label">
        {question.text}
      </p>

      <div className="tri-row__options">
        <button
          type="button"
          className={`tri-option tri-option--yes ${value === "si" ? "tri-option--selected" : ""}`}
          onClick={() => handleChange("si")}
          aria-pressed={value === "si"}
        >
          <span>Sí</span>
        </button>
        <button
          type="button"
          className={`tri-option tri-option--no ${value === "no" ? "tri-option--selected" : ""}`}
          onClick={() => handleChange("no")}
          aria-pressed={value === "no"}
        >
          <span>No</span>
        </button>
        <button
          type="button"
          className={`tri-option tri-option--na ${value === "no-aplica" ? "tri-option--selected" : ""}`}
          onClick={() => handleChange("no-aplica")}
          aria-pressed={value === "no-aplica"}
        >
          <span>No aplica</span>
        </button>
      </div>
    </div>
  );
});

interface TriStateQuestionGroupProps {
  title: string;
  questions: QuestionItem[];
  answers: Record<string, QuestionAnswer>;
  onAnswerChange: (questionId: string, answer: QuestionAnswer) => void;
}

export function TriStateQuestionGroup({
  title,
  questions,
  answers,
  onAnswerChange,
}: TriStateQuestionGroupProps) {
  const handleClearAll = useCallback(() => {
    questions.forEach((q) => {
      if (answers[q.id] !== null) {
        onAnswerChange(q.id, null);
      }
    });
  }, [questions, answers, onAnswerChange]);

  const hasAnySelected = questions.some((q) => answers[q.id] !== null && answers[q.id] !== undefined);

  return (
    <section
      className="tri-group"
      aria-labelledby={`group-title-${title.substring(0, 10)}`}
    >
      <header className="tri-group__header">
        <div>
          <h2 id={`group-title-${title.substring(0, 10)}`} className="tri-group__title">
            {title}
          </h2>
        </div>
        {/* <div className="tri-group__columns" aria-hidden="true">
          <span>Sí</span>
          <span>No</span>
          <span>No aplica</span>
        </div> */}
      </header>

      <div className="tri-group__body">
        {questions.map((q) => (
          <TriStateQuestionRow
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={onAnswerChange}
          />
        ))}
      </div>

      <div className="tri-group__footer">
        <button
          type="button"
          className="tri-group__clear-btn"
          onClick={handleClearAll}
          disabled={!hasAnySelected}
        >
          Limpiar campos
        </button>
      </div>
    </section>
  );
}
