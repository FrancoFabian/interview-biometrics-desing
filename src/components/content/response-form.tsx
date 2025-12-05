"use client"

import type React from "react"
import ModernSelect from "../modern-select"
import type { ValidationErrors } from "../../types/form-types"

interface ResponseFormProps {
  respuesta: string
  motivo: string
  observaciones: string
  validationErrors: ValidationErrors
  onRespuestaChange: (value: string) => void
  onMotivoChange: (value: string) => void
  onObservacionesChange: (value: string) => void
  onSubmit: () => void
  onReset: () => void
  isSubmitting: boolean
  canSubmit?: boolean
  canReset?: boolean
}

const RESPUESTA_OPTIONS = [
  { keyId: "aprobada", label: "Aprobada" },
  { keyId: "rechazada", label: "Rechazada" },
]

const MOTIVO_OPTIONS_RECHAZADA = [
  { keyId: "foto-no-coincide", label: "Fotografía del cliente no coincide" },
  { keyId: "foto-borrosa", label: "Fotografía borrosa o manipulada" },
  { keyId: "foto-no-visible", label: "Fotografía no visible" },
  { keyId: "documento-ilegible", label: "Documento ilegible" },
  { keyId: "datos-inconsistentes", label: "Datos inconsistentes" },
  { keyId: "documento-vencido", label: "Documento vencido" },
]

const MOTIVO_OPTIONS_APROBADA = [
  { keyId: "datos-verificados", label: "Datos verificados" },
  { keyId: "documento-legible", label: "Documento legible" },
  { keyId: "foto-coincide", label: "Fotografía coincide" },
  { keyId: "vigencia-confirmada", label: "Vigencia confirmada" },
]

export function ResponseForm({
  respuesta,
  motivo,
  observaciones,
  validationErrors,
  onRespuestaChange,
  onMotivoChange,
  onObservacionesChange,
  onSubmit,
  onReset,
  isSubmitting,
  canSubmit,
  canReset,
}: ResponseFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const motivoItems = respuesta === "aprobada" ? MOTIVO_OPTIONS_APROBADA : MOTIVO_OPTIONS_RECHAZADA

  return (
    <section className="response-section" style={{ padding: "20px 30px 40px 30px" }}>
      <form onSubmit={handleSubmit}>
        <div className="response-form-grid">
          {/* Columna izquierda: Dropdowns */}
          <div className="response-form-column">
            <div className="form-group">
              <label htmlFor="respuesta" className="form-label form-label-required">
                Respuesta
              </label>
              <ModernSelect
                id="respuesta"
                name="respuesta"
                items={RESPUESTA_OPTIONS}
                placeholder="Seleccione una opción"
                multiple={false}
                defaultSelectedKeys={respuesta ? [respuesta] : []}
                onSelectionChange={(keys) => onRespuestaChange(keys[0] || "")}
              />
              {validationErrors.respuesta && <span className="form-error">{validationErrors.respuesta}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="motivo" className={`form-label ${respuesta === "rechazada" ? "form-label-required" : ""}`}>
                Motivo
              </label>
              <ModernSelect
                id="motivo"
                name="motivo"
                items={motivoItems}
                placeholder="Seleccione un motivo"
                multiple={false}
                defaultSelectedKeys={motivo ? [motivo] : []}
                onSelectionChange={(keys) => onMotivoChange(keys[0] || "")}
              />
              {validationErrors.motivo && <span className="form-error">{validationErrors.motivo}</span>}
            </div>
          </div>

          {/* Columna derecha: Textarea */}
          <div className="response-form-column">
            <div className="form-group">
              <label htmlFor="observaciones" className="form-label">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                className="form-textarea form-textarea-tall"
                value={observaciones}
                onChange={(e) => onObservacionesChange(e.target.value)}
                placeholder="Agregue observaciones adicionales..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onReset} disabled={!canReset}>
            Limpiar formulario
          </button>
          <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting || !canSubmit}>
            {isSubmitting ? "Enviando..." : "Finalizar"}
          </button>
        </div>
      </form>
    </section>
  )
}
