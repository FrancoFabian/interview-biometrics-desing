"use client"

import type { QuestionItem, QuestionAnswer } from "../../types/form-types"

interface QuestionGroupProps {
  title: string
  questions: QuestionItem[]
  answers: Record<string, QuestionAnswer>
  onAnswerChange: (questionId: string, answer: QuestionAnswer) => void
  error?: string | null
}

export function QuestionGroup({ title, questions, answers, onAnswerChange, error }: QuestionGroupProps) {
  return (
    <section className="question-group">
      <h3 className="question-group-title">{title}</h3>
      {error && <span className="form-error">{error}</span>}
      <div className="question-list">
        {questions.map((question) => (
          <fieldset key={question.id} className="question-item-fieldset">
            <legend className="question-text">{question.text}</legend>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name={question.id}
                  value="si"
                  className="radio-input"
                  checked={answers[question.id] === "si"}
                  onChange={() => onAnswerChange(question.id, "si")}
                />
                <span className="radio-label">Sí</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name={question.id}
                  value="no"
                  className="radio-input"
                  checked={answers[question.id] === "no"}
                  onChange={() => onAnswerChange(question.id, "no")}
                />
                <span className="radio-label">No</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name={question.id}
                  value="no-aplica"
                  className="radio-input"
                  checked={answers[question.id] === "no-aplica"}
                  onChange={() => onAnswerChange(question.id, "no-aplica")}
                />
                <span className="radio-label">No Aplica</span>
              </label>
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  )
}
