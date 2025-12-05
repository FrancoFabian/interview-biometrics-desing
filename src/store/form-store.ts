import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FormData, QuestionAnswer } from "../types/form-types"

const initialFormData: FormData = {
  activeTab: "identificacion",
  questionAnswers: {},
  respuesta: "",
  motivo: "",
  observaciones: "",
  tipoExpediente: "",
}

interface FormStoreState {
  formData: FormData
  setField: <K extends keyof FormData>(field: K, value: FormData[K]) => void
  setQuestionAnswer: (questionId: string, answer: QuestionAnswer) => void
  reset: () => void
}

export const useFormStore = create<FormStoreState>()(
  persist(
    (set) => ({
      formData: initialFormData,
      setField: (field, value) =>
        set((state) => ({ formData: { ...state.formData, [field]: value } })),
      setQuestionAnswer: (questionId, answer) =>
        set((state) => ({
          formData: {
            ...state.formData,
            questionAnswers: { ...state.formData.questionAnswers, [questionId]: answer },
          },
        })),
      reset: () => set({ formData: initialFormData }),
    }),
    {
      name: "form-store",
      partialize: (state) => ({ formData: state.formData }),
    },
  ),
)

