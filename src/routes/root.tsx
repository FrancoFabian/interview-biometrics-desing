// src/routes/root.tsx
import { DocumentVerificationTabs, type TabItem } from "../components/document-verification-tabs";
import { ImageGrid } from "../components/content/image-grid";
import { TriStateQuestionGroup } from "../components/content/tri-state-question-group";
import { ExternalLinksRow } from "../components/content/external-links-row";
import { ResponseForm } from "../components/content/response-form";
import { SummaryModal } from "../components/content/summary-modal";
import { useFormState } from "../hooks/use-form-state";
import { imageLabelsByTab, type QuestionItem, type TabType } from "../types/form-types";
import { useIsMobile } from "../hooks/use-mobile";
import { CustomTable, type Column } from "../components/custom-table";
import { Progress } from "../components/progress";
import ModernSelect from "../components/modern-select";


// Configuración de Tabs
const VERIFICATION_TABS: TabItem[] = [
    { key: "identificacion", label: "Identificación" },
    { key: "comprobante", label: "Comprobante" },
    { key: "propiedad", label: "Propiedad" },
    { key: "contrato", label: "Contrato" },
    { key: "contacto", label: "Contacto" },
    { key: "fotografia", label: "Fotografía" },
];

const photoQuestions: QuestionItem[] = [
    { id: "color", text: "¿La digitalización de la ID para este folio está a color?" },
    { id: "match", text: "¿Los datos en ambas ID, expediente y digitalizada coinciden?" },
];

const searchQuestions: QuestionItem[] = [
    { id: "vigente", text: "¿La información devuelta por tus consultas es vigente?" },
    { id: "coincide", text: "¿La información devuelta por las consultas coincide con la identificación del cliente?" },
];

export default function BiometricosPage() {
    const isMobile = useIsMobile();
    const {
        formData,
        isSubmitting,
        showModal,
        validationErrors,
        payload,
        updateField,
        setQuestionAnswer,
        handleSubmit,
        confirmSubmit,
        resetForm,
        closeModal,
        canSubmit,
        canReset,
    } = useFormState();

    const currentImages = imageLabelsByTab[formData.activeTab].map((label, index) => ({
        id: `img-${index + 1}`,
        label,
    }));

    type Row = {
        key: string;
        nombreCliente: string;
        fechaFolio: string;
        folioSAC: string;
        folioMV: string;
        registrado: string;
        opciones: string;
        detalles: string;
    };

    const columns: Column[] = [
        { key: "nombreCliente", label: "Nombre de Cliente" },
        { key: "fechaFolio", label: "Fecha de Folio" },
        { key: "folioSAC", label: "Folio SAC" },
        { key: "folioMV", label: "Folio MV" },
        { key: "registrado", label: "Registrado" },
        { key: "opciones", label: "Options" },
        { key: "detalles", label: "Details" },
    ];

    const rows: Row[] = [
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

    const renderCell = (item: Row, columnKey: string) => {
        if (columnKey === "opciones" || columnKey === "detalles") {
            return <a href="#" style={{ color: "var(--color-text-primary)", textDecoration: "underline" }}>{item[columnKey as keyof Row] as string}</a>;
        }
        return item[columnKey as keyof Row] as string;
    };

    return (
        <>
            <section className="content-section" aria-labelledby="content-title" style={isMobile ? { borderRadius: 0, boxShadow: "none", padding: 0, margin: 0, width: "100%" } : undefined}>
                <header className="content-header content-pad-header">
                    <h1 id="content-title" className="content-title">Verificación Biométrica</h1>
                    <p className="content-subtitle">
                        Complete el formulario de verificación con los datos biométricos del solicitante
                    </p>
                </header>
                <div className={`content-pad-container align-right gap-bottom-xl`}>
                    <Progress value={50} label="Estado del Folio" showValueLabel />
                </div>
                <div className="content-pad-container gap-bottom-xl">
                    <CustomTable columns={columns} rows={rows} ariaLabel="Tabla de folios" renderCell={renderCell} />
                </div>
                <div className="content-pad-container gap-bottom-xl">
                    <ModernSelect
                        items={[
                            { keyId: "credito", label: "Expediente Crédito" },
                            { keyId: "captacion", label: "Expediente Captación" },
                        ]}
                        width={isMobile ? "md" : "lg"}
                        placeholder="Select"
                        defaultSelectedKeys={formData.tipoExpediente ? [formData.tipoExpediente] : []}
                        onSelectionChange={(keys) => updateField("tipoExpediente", keys[0] || "")}
                    />
                </div>
                <DocumentVerificationTabs
                    tabs={VERIFICATION_TABS}
                    value={formData.activeTab}
                    onValueChange={(tabKey) => updateField("activeTab", tabKey as TabType)}
                />

                <section className="image-section">
                    <h2 className="section-title content-pad-section">Tabla de identificación</h2>
                    <ImageGrid images={currentImages} />
                </section>

                <TriStateQuestionGroup
                    title="Selecciona tu respuesta de acuerdo a lo que visualizas en las fotografías"
                    questions={photoQuestions}
                    answers={formData.questionAnswers}
                    onAnswerChange={setQuestionAnswer}
                />

                <ExternalLinksRow />

                <TriStateQuestionGroup
                    title="Selecciona tu respuesta de acuerdo al resultado de la búsqueda"
                    questions={searchQuestions}
                    answers={formData.questionAnswers}
                    onAnswerChange={setQuestionAnswer}
                />

                <ResponseForm
                    respuesta={formData.respuesta}
                    motivo={formData.motivo}
                    observaciones={formData.observaciones}
                    validationErrors={validationErrors}
                    onRespuestaChange={(value) => updateField("respuesta", value)}
                    onMotivoChange={(value) => updateField("motivo", value)}
                    onObservacionesChange={(value) => updateField("observaciones", value)}
                    onSubmit={handleSubmit}
                    onReset={resetForm}
                    isSubmitting={isSubmitting}
                    canSubmit={canSubmit}
                    canReset={canReset}
                />
            </section>

            <SummaryModal isOpen={showModal} onClose={closeModal} payload={payload} onConfirm={confirmSubmit} />
        </>
    );
}
