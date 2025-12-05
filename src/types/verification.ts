// src/types/verification.ts
// Types for the verification flow (table, questions, folios)

import type { Column } from "../components/ui/CustomTable/CustomTable";

// Re-export Column for convenience
export type { Column };

// Row type for the folios table
export interface FolioRow {
    key: string;
    nombreCliente: string;
    fechaFolio: string;
    folioSAC: string;
    folioMV: string;
    registrado: string;
    opciones: string;
    detalles: string;
}
