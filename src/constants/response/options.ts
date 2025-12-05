// src/constants/response/options.ts
// Options for the response form selects

import type { SelectItemProps } from "../../components/ui/ModernSelect/ModernSelect";

export const RESPUESTA_OPTIONS: SelectItemProps[] = [
    { keyId: "aprobada", label: "Aprobada" },
    { keyId: "rechazada", label: "Rechazada" },
];

export const MOTIVO_OPTIONS_RECHAZADA: SelectItemProps[] = [
    { keyId: "foto-no-coincide", label: "Fotografía del cliente no coincide" },
    { keyId: "foto-borrosa", label: "Fotografía borrosa o manipulada" },
    { keyId: "foto-no-visible", label: "Fotografía no visible" },
    { keyId: "documento-ilegible", label: "Documento ilegible" },
    { keyId: "datos-inconsistentes", label: "Datos inconsistentes" },
    { keyId: "documento-vencido", label: "Documento vencido" },
];

export const MOTIVO_OPTIONS_APROBADA: SelectItemProps[] = [
    { keyId: "datos-verificados", label: "Datos verificados" },
    { keyId: "documento-legible", label: "Documento legible" },
    { keyId: "foto-coincide", label: "Fotografía coincide" },
    { keyId: "vigencia-confirmada", label: "Vigencia confirmada" },
];
