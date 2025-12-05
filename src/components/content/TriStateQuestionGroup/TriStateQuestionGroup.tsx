import React, { useCallback } from "react";
import clsx from "clsx";
import type { QuestionItem, QuestionAnswer } from "../../../types/form-types";
import styles from "./TriStateQuestionGroup.module.css";

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
            className={styles.row}
            role="radiogroup"
            aria-labelledby={`question-${question.id}`}
        >
            <p id={`question-${question.id}`} className={styles.rowLabel}>
                {question.text}
            </p>

            <div className={styles.rowOptions}>
                <button
                    type="button"
                    className={clsx(
                        styles.option,
                        styles.yes,
                        value === "si" && styles.selected
                    )}
                    onClick={() => handleChange("si")}
                    aria-pressed={value === "si"}
                >
                    <span>Sí</span>
                </button>
                <button
                    type="button"
                    className={clsx(
                        styles.option,
                        styles.no,
                        value === "no" && styles.selected
                    )}
                    onClick={() => handleChange("no")}
                    aria-pressed={value === "no"}
                >
                    <span>No</span>
                </button>
                <button
                    type="button"
                    className={clsx(
                        styles.option,
                        styles.na,
                        value === "no-aplica" && styles.selected
                    )}
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
            className={styles.group}
            aria-labelledby={`group-title-${title.substring(0, 10)}`}
        >
            <header className={styles.header}>
                <div>
                    <h2 id={`group-title-${title.substring(0, 10)}`} className={styles.title}>
                        {title}
                    </h2>
                </div>
            </header>

            <div className={styles.body}>
                {questions.map((q) => (
                    <TriStateQuestionRow
                        key={q.id}
                        question={q}
                        value={answers[q.id]}
                        onChange={onAnswerChange}
                    />
                ))}
            </div>

            <div className={styles.footer}>
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={handleClearAll}
                    disabled={!hasAnySelected}
                >
                    Limpiar campos
                </button>
            </div>
        </section>
    );
}
