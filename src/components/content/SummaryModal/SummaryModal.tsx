"use client"

import clsx from "clsx"
import { useState } from "react"
import type { FormPayload } from "../../../types/form-types"
import { Button } from "../../ui/Button/Button"
import styles from "./SummaryModal.module.css"

interface SummaryImage {
    id: string
    label: string
    src: string
}

interface SummaryModalProps {
    isOpen: boolean
    onClose: () => void
    payload: FormPayload | null
    onConfirm: () => void
    images?: SummaryImage[]
}

export function SummaryModal({ isOpen, onClose, payload, onConfirm, images = [] }: SummaryModalProps) {
    const [isSuccess, setIsSuccess] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    if (!isOpen || !payload) return null

    const handleConfirm = () => {
        setIsSuccess(true)
    }

    const handleFinalClose = () => {
        onConfirm()
    }

    if (isSuccess) {
        return (
            <div className={clsx(styles.overlay, styles.visible)} role="dialog" aria-modal="true">
                <div className={styles.modal}>
                    <div className={styles.successContainer}>
                        <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <h2 className={styles.successTitle}>¡Solicitud enviada con éxito!</h2>
                        <p className={styles.successMessage}>La información ha sido registrada correctamente.</p>

                        <Button
                            variant="secondary"
                            onClick={() => setShowDetails(!showDetails)}
                            className={styles.viewInfoBtn}
                        >
                            {showDetails ? "Ocultar información enviada" : "Ver información enviada"}
                        </Button>
                    </div>

                    {showDetails && (
                        <div className={styles.body}>
                            <SummaryContent payload={payload} images={images} />
                        </div>
                    )}

                    <footer className={styles.footer}>
                        <Button variant="primary" onClick={handleFinalClose}>
                            Finalizar
                        </Button>
                    </footer>
                </div>
            </div>
        )
    }

    return (
        <div
            className={clsx(styles.overlay, styles.visible)}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2 id="modal-title" className={styles.title}>
                        Resumen de la solicitud
                    </h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </header>

                <div className={styles.body}>
                    <SummaryContent payload={payload} images={images} />
                </div>

                <footer className={styles.footer}>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleConfirm}>
                        Confirmar envío
                    </Button>
                </footer>
            </div>
        </div>
    )
}

function SummaryContent({ payload, images }: { payload: FormPayload; images: SummaryImage[] }) {
    return (
        <>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Detalles Generales</h3>
                <div className={styles.field}>
                    <span className={styles.label}>Tipo de Expediente</span>
                    <span className={styles.value}>{payload.tipoExpediente || "No seleccionado"}</span>
                </div>
                <div className={styles.field}>
                    <span className={styles.label}>Respuesta</span>
                    <span className={styles.value} style={{ textTransform: 'capitalize' }}>{payload.respuesta}</span>
                </div>
                {payload.motivo && (
                    <div className={styles.field}>
                        <span className={styles.label}>Motivo</span>
                        <span className={styles.value}>{payload.motivo}</span>
                    </div>
                )}
                {payload.observaciones && (
                    <div className={styles.field}>
                        <span className={styles.label}>Observaciones</span>
                        <span className={styles.value}>{payload.observaciones}</span>
                    </div>
                )}
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Documentación ({payload.activeTab})</h3>
                <div className={styles.imagesGrid}>
                    {images.map((img) => (
                        <div key={img.id} className={styles.imagePreview}>
                            <img src={img.src || "/placeholder.svg"} alt={img.label} />
                            <div className={styles.imageLabel}>{img.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
