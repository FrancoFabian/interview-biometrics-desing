import { Tabs, type TabItem } from "../../ui";

interface DocumentVerificationTabsProps {
    activeTab: string;
    onTabChange: (key: string) => void;
}

const VERIFICATION_TABS: TabItem[] = [
    { key: "identificacion", label: "Identificación" },
    { key: "comprobante", label: "Comprobante" },
    { key: "propiedad", label: "Propiedad" },
    { key: "contrato", label: "Contrato" },
    { key: "contacto", label: "Contacto" },
    { key: "fotografia", label: "Fotografía" },
];

export function DocumentVerificationTabs({ activeTab, onTabChange }: DocumentVerificationTabsProps) {
    return (
        <Tabs
            tabs={VERIFICATION_TABS}
            value={activeTab}
            onValueChange={onTabChange}
        />
    );
}
