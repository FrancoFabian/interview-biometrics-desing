import { CustomTable } from "../components/ui";
import { Progress } from "../components/ui";
import { ModernSelect } from "../components/ui";
import {
    ImageGrid,
    TriStateQuestionGroup,
    ExternalLinksRow,
    ResponseForm,
    SummaryModal,
    DocumentVerificationTabs
} from "../components/content";

import { useFormState } from "../hooks/use-form-state";
import { type TabType } from "../types/form-types";
import { useIsMobile } from "../hooks/use-mobile";
import styles from "./BiometricosPage.module.css";
import clsx from "clsx";
import { useState } from "react";

import { photoQuestions, searchQuestions } from "../constants/verification/questions";
import { folioColumns } from "../constants/verification/table-config";
import { mockFolios } from "../mocks/verification/folios.mock";
import { mockImages } from "../mocks/verification/images.mock";
import type { FolioRow } from "../types/verification";

export default function BiometricosPage() {
    const isMobile = useIsMobile();
    const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
    const [files, setFiles] = useState<Record<string, File>>({});

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

    const handleImageUpload = (id: string, file: File) => {
        if (file.type !== "image/webp") {
            alert("Solo se permiten archivos .webp");
            return;
        }
        const url = URL.createObjectURL(file);
        setUploadedImages(prev => ({ ...prev, [id]: url }));
        setFiles(prev => ({ ...prev, [id]: file }));
    };

    const handleConfirmSubmit = () => {
        const formData = new FormData();
        if (payload) {
            formData.append("payload", JSON.stringify(payload));
        }
        Object.entries(files).forEach(([key, file]) => {
            formData.append(key, file);
        });

        console.log("Submitting FormData (Multipart):");
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        confirmSubmit();

        // Clear form and uploaded images
        resetForm();
        setUploadedImages({});
        setFiles({});
    };

    const currentImages = mockImages[formData.activeTab].map((mock) => ({
        id: mock.id,
        label: mock.name,
        src: uploadedImages[mock.id] || mock.imageUrl
    }));

    const renderCell = (item: FolioRow, columnKey: string) => {
        if (columnKey === "opciones" || columnKey === "detalles") {
            return <a href="#" style={{ color: "var(--color-text-primary)", textDecoration: "underline" }}>{item[columnKey as keyof FolioRow] as string}</a>;
        }
        return item[columnKey as keyof FolioRow] as string;
    };

    return (
        <>
            <section
                className={styles.section}
                aria-labelledby="content-title"
                style={isMobile ? { padding: 0 } : undefined}
            >
                <header className={clsx(styles.header, styles.padHeader)}>
                    <h1 id="content-title" className={styles.title}>Verificación Biométrica</h1>
                    <p className={styles.subtitle}>
                        Complete el formulario de verificación con los datos biométricos del solicitante
                    </p>
                </header>
                <div className={clsx(styles.padContainer, styles.alignRight, styles.gapBottomXl)}>
                    <Progress value={50} label="Estado del Folio" showValueLabel />
                </div>
                <div className={clsx(styles.padContainer, styles.gapBottomXl)}>
                    <CustomTable columns={folioColumns} rows={mockFolios} ariaLabel="Tabla de folios" renderCell={renderCell} />
                </div>
                <div className={clsx(styles.padContainer, styles.gapBottomXl)}>
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
                    activeTab={formData.activeTab}
                    onTabChange={(tabKey) => updateField("activeTab", tabKey as TabType)}
                />

                <section className={styles.imageSection}>
                    <h2 className={clsx(styles.sectionTitle, styles.padSection)}>Tabla de identificación</h2>
                    <ImageGrid images={currentImages} onUpload={handleImageUpload} />
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



            <SummaryModal
                key={showModal ? "open" : "closed"}
                isOpen={showModal}
                onClose={closeModal}
                payload={payload}
                onConfirm={handleConfirmSubmit}
                images={currentImages}
            />
        </>
    );
}
