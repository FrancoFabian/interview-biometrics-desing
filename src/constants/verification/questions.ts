// src/constants/verification/questions.ts
// Question definitions for the biometric verification flow

import type { QuestionItem } from "../../types/form-types";

export const photoQuestions: QuestionItem[] = [
    { id: "color", text: "¿La digitalización de la ID para este folio está a color?" },
    { id: "match", text: "¿Los datos en ambas ID, expediente y digitalizada coinciden?" },
];

export const searchQuestions: QuestionItem[] = [
    { id: "vigente", text: "¿La información devuelta por tus consultas es vigente?" },
    { id: "coincide", text: "¿La información devuelta por las consultas coincide con la identificación del cliente?" },
];
