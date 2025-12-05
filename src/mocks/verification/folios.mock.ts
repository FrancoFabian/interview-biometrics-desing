// src/mocks/verification/folios.mock.ts
// Mock data for the folios table

import type { FolioRow } from "../../types/verification";

export const mockFolios: FolioRow[] = [
    {
        key: "1",
        nombreCliente: "Jerry Mattedi",
        fechaFolio: "19 May, 2021 · 10:10 AM",
        folioSAC: "251-661-5362",
        folioMV: "12345678",
        registrado: "Sí",
        opciones: "Options",
        detalles: "Details",
    },
];
