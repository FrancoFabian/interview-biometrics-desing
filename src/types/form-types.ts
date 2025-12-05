export type TabType = "identificacion" | "comprobante" | "propiedad" | "contrato" | "contacto" | "fotografia"

export type QuestionAnswer = "si" | "no" | "no-aplica" | null

export interface ValidationErrors {
    respuesta: string | null
    motivo: string | null
    preguntas: string | null
}

export interface FormData {
    activeTab: TabType
    questionAnswers: Record<string, QuestionAnswer>
    respuesta: string
    motivo: string
    observaciones: string
    tipoExpediente?: string
}

export const imageLabelsByTab: Record<TabType, [string, string, string]> = {
    identificacion: ["INE frontal", "INE reverso", "Selfie"],
    comprobante: ["Comprobante 1", "Comprobante 2", "Comprobante 3"],
    propiedad: ["Escritura 1", "Escritura 2", "Fachada"],
    contrato: ["Contrato página 1", "Contrato página 2", "Firma"],
    contacto: ["Referencia 1", "Referencia 2", "Referencia 3"],
    fotografia: ["Foto frontal", "Foto perfil", "Foto cuerpo completo"],
}

export interface FormPayload {
    activeTab: TabType
    images: [string, string, string]
    answers: Record<string, QuestionAnswer>
    respuesta: string
    motivo: string
    observaciones: string
    tipoExpediente?: string
}

export interface QuestionItem {
    id: string
    text: string
}

export interface ImageItem {
    id: string
    label: string
    src?: string
}

export interface MenuItem {
    id: string
    label: string
    icon: string
    href: string
    active?: boolean
}

export interface MenuSection {
    title: string
    items: MenuItem[]
}
