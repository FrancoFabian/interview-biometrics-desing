"use client"

import type React from "react"
import clsx from "clsx"
import { ModernSelect } from "../../ui/ModernSelect/ModernSelect"
import { Button } from "../../ui/Button/Button"
import type { ValidationErrors } from "../../../types/form-types"
import styles from "./ResponseForm.module.css"

// Extracted constants
import {
    RESPUESTA_OPTIONS,
    MOTIVO_OPTIONS_RECHAZADA,
    MOTIVO_OPTIONS_APROBADA,
} from "../../../constants/response/options"

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
        <section className={styles.section} style={{ padding: "20px 30px 40px 30px" }}>
            <form onSubmit={handleSubmit}>
                <div className={styles.grid}>
                    {/* Columna izquierda: Dropdowns */}
                    <div className={styles.column}>
                        <div className={styles.group}>
                            <label htmlFor="respuesta" className={clsx(styles.label, styles.labelRequired)}>
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
                            {validationErrors.respuesta && <span className={styles.error}>{validationErrors.respuesta}</span>}
                        </div>

                        <div className={styles.group}>
                            <label
                                htmlFor="motivo"
                                className={clsx(
                                    styles.label,
                                    respuesta === "rechazada" && styles.labelRequired
                                )}
                            >
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
                            {validationErrors.motivo && <span className={styles.error}>{validationErrors.motivo}</span>}
                        </div>
                    </div>

                    {/* Columna derecha: Textarea */}
                    <div className={styles.column}>
                        <div className={styles.group}>
                            <label htmlFor="observaciones" className={styles.label}>
                                Observaciones
                            </label>
                            <textarea
                                id="observaciones"
                                className={clsx(styles.textarea, styles.textareaTall)}
                                value={observaciones}
                                onChange={(e) => onObservacionesChange(e.target.value)}
                                placeholder="Agregue observaciones adicionales..."
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onReset}
                        disabled={!canReset}
                        className="w-full sm:w-auto" // Utility helper or handle in module media query
                    >
                        Limpiar formulario
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting || !canSubmit}
                        className="w-full sm:w-auto"
                    >
                        {isSubmitting ? "Enviando..." : "Finalizar"}
                    </Button>
                </div>
            </form>
        </section>
    )
}
