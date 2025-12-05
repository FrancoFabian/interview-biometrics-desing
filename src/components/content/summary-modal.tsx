"use client"

import type { FormPayload } from "../../types/form-types"

interface SummaryModalProps {
  isOpen: boolean
  onClose: () => void
  payload: FormPayload | null
  onConfirm: () => void
}

export function SummaryModal({ isOpen, onClose, payload, onConfirm }: SummaryModalProps) {
  if (!isOpen || !payload) return null

  return (
    <div
      className="modal-overlay visible"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">
            Resumen de la solicitud
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="modal-body">
          <pre className="payload-code">
            <code>{JSON.stringify(payload, null, 2)}</code>
          </pre>
        </div>

        <footer className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-success" onClick={onConfirm}>
            Confirmar envío
          </button>
        </footer>
      </div>
    </div>
  )
}
