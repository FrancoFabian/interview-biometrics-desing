"use client"

import type { QuestionItem, QuestionAnswer } from "../../../types/form-types"
import styles from "./QuestionGroup.module.css"

interface QuestionGroupProps {
    title: string
    questions: QuestionItem[]
    answers: Record<string, QuestionAnswer>
    onAnswerChange: (questionId: string, answer: QuestionAnswer) => void
    error?: string | null
}

export function QuestionGroup({ title, questions, answers, onAnswerChange, error }: QuestionGroupProps) {
    return (
        <section className={styles.group}>
            <h3 className={styles.title}>{title}</h3>
            {error && <span className={styles.error}>{error}</span>}
            <div className={styles.list}>
                {questions.map((question) => (
                    <fieldset key={question.id} className={styles.fieldset}>
                        <legend className={styles.questionText}>{question.text}</legend>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="si"
                                    className={styles.radioInput}
                                    checked={answers[question.id] === "si"}
                                    onChange={() => onAnswerChange(question.id, "si")}
                                />
                                <span className={styles.radioLabel}>Sí</span>
                            </label>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="no"
                                    className={styles.radioInput}
                                    checked={answers[question.id] === "no"}
                                    onChange={() => onAnswerChange(question.id, "no")}
                                />
                                <span className={styles.radioLabel}>No</span>
                            </label>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="no-aplica"
                                    className={styles.radioInput}
                                    checked={answers[question.id] === "no-aplica"}
                                    onChange={() => onAnswerChange(question.id, "no-aplica")}
                                />
                                <span className={styles.radioLabel}>No Aplica</span>
                            </label>
                        </div>
                    </fieldset>
                ))}
            </div>
        </section>
    )
}
