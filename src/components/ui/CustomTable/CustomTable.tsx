import React from 'react';
import styles from './CustomTable.module.css';

// Tipos genéricos para las columnas y filas
export interface Column {
    key: string;
    label: string;
}

interface TableProps<T> {
    columns: Column[];
    rows: T[];
    ariaLabel?: string;
    // Prop opcional para renderizado personalizado de celdas
    renderCell?: (item: T, columnKey: string) => React.ReactNode;
}

/**
 * Utilidad para obtener valores de objetos de forma segura.
 * Reemplaza al 'getKeyValue' de HeroUI.
 */
function getKeyValue<T>(item: T, key: string): React.ReactNode {
    // @ts-expect-error - Acceso dinámico simple
    const value = item[key];
    return value;
}

export const CustomTable = <T extends { key: string | number }>({
    columns,
    rows,
    ariaLabel = "Tabla de datos",
    renderCell
}: TableProps<T>) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table} aria-label={ariaLabel}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th scope="col" key={column.key}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row) => (
                            <tr key={row.key} tabIndex={0}>
                                {columns.map((column) => (
                                    <td key={`${row.key}-${column.key}`}>
                                        {renderCell
                                            ? renderCell(row, column.key)
                                            : getKeyValue(row, column.key)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
