// src/constants/verification/table-config.ts
// Table column configuration for the folios table

import type { Column } from "../../types/verification";

export const folioColumns: Column[] = [
    { key: "nombreCliente", label: "Nombre de Cliente" },
    { key: "fechaFolio", label: "Fecha de Folio" },
    { key: "folioSAC", label: "Folio SAC" },
    { key: "folioMV", label: "Folio MV" },
    { key: "registrado", label: "Registrado" },
    { key: "opciones", label: "Options" },
    { key: "detalles", label: "Details" },
];
