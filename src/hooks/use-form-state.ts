"use client"

import { useState, useCallback, useMemo } from "react"
import type { FormData, QuestionAnswer, ValidationErrors, FormPayload } from "../types/form-types"
import { imageLabelsByTab } from "../types/form-types"
import { useFormStore } from "../store/form-store"

const initialValidationErrors: ValidationErrors = {
  respuesta: null,
  motivo: null,
  preguntas: null,
}

export function useFormState() {
  const { formData, setField, setQuestionAnswer: storeSetAnswer, reset } = useFormStore()
  const [isSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(initialValidationErrors)
  const [payload, setPayload] = useState<FormPayload | null>(null)

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setField(field, value)
    if (field === "respuesta" || field === "motivo") {
      setValidationErrors((prev) => ({ ...prev, [field]: null }))
    }
  }, [setField])

  const setQuestionAnswer = useCallback((questionId: string, answer: QuestionAnswer) => {
    storeSetAnswer(questionId, answer)
    setValidationErrors((prev) => ({ ...prev, preguntas: null }))
  }, [storeSetAnswer])

  const hasAtLeastOneAnswer = useMemo(() =>
    Object.values(formData.questionAnswers).some((answer) => answer !== null),
  [formData.questionAnswers])

  const canSubmit = useMemo(() => {
    const hasRespuesta = !!formData.respuesta
    const motivoRequired = formData.respuesta === "rechazada"
    const hasMotivo = !!formData.motivo
    return hasRespuesta && (!motivoRequired || hasMotivo) && hasAtLeastOneAnswer
  }, [formData.respuesta, formData.motivo, hasAtLeastOneAnswer])

  const canReset = useMemo(() => {
    const anyField =
      !!formData.respuesta ||
      !!formData.motivo ||
      !!formData.observaciones ||
      !!formData.tipoExpediente ||
      hasAtLeastOneAnswer
    return anyField
  }, [formData.respuesta, formData.motivo, formData.observaciones, formData.tipoExpediente, hasAtLeastOneAnswer])

  const handleSubmit = useCallback(() => {
    const errors: ValidationErrors = {
      respuesta: null,
      motivo: null,
      preguntas: null,
    }

    if (!formData.respuesta) {
      errors.respuesta = "La respuesta es obligatoria"
    }

    if (formData.respuesta === "rechazada" && !formData.motivo) {
      errors.motivo = "El motivo es obligatorio cuando la respuesta es Rechazada"
    }

    if (!hasAtLeastOneAnswer) {
      errors.preguntas = "Debe responder al menos una pregunta"
    }

    const hasErrors = errors.respuesta || errors.motivo || errors.preguntas
    if (hasErrors) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors(initialValidationErrors)

    const newPayload: FormPayload = {
      activeTab: formData.activeTab,
      images: imageLabelsByTab[formData.activeTab],
      answers: formData.questionAnswers,
      respuesta: formData.respuesta,
      motivo: formData.motivo,
      observaciones: formData.observaciones,
      tipoExpediente: formData.tipoExpediente,
    }

    setPayload(newPayload)
    setShowModal(true)
  }, [formData, hasAtLeastOneAnswer])

  const confirmSubmit = useCallback(() => {
    setShowModal(false)
  }, [])

  const resetForm = useCallback(() => {
    reset()
    setValidationErrors(initialValidationErrors)
    setShowModal(false)
    setPayload(null)
  }, [reset])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [])

  return {
    formData,
    isSubmitting,
    showModal,
    validationErrors,
    payload,
    updateField,
    setQuestionAnswer,
    handleSubmit,
    confirmSubmit,
    resetForm,
    closeModal,
    canSubmit,
    canReset,
  }
}
