"use client";

import { useEffect, useState } from "react";
import { CollapsiblePanel } from "@/presentation/components/CollapsiblePanel/CollapsiblePanel";
import { Previewer } from "../../Previewer/Previewer";
import { DynamicForm } from "../../DynamicForm/DynamicForm";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";

import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";
import { NumberToWordsAdapter } from "@/infrastructure/adapters/NumberToWordsAdapter";
import { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { ChevronRight, Download, Loader2, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { exportToPdfAction } from "@/app/[lang]/templates/[slug]/actions";
import { IAuthResponse } from "@/domain/interfaces/IAuthResponse";
import { errorToast } from "@/presentation/components/Toaster/controller/toast.controller";
import { useUserTemplateData } from "./hooks/useUserTemplateData";

interface Props {
  fields: TemplateFieldDefinition[];
  userInfo: IAuthResponse | null;
  templateId: string;
}

export const TemplateCuentaDeCobro = ({
  fields,
  userInfo,
  templateId,
}: Readonly<Props>) => {
  const resetFields = useTemplateStore((state) => state.resetFields);
  const fieldsStore = useTemplateStore((state) => state.fields);
  const getFieldValue = (name: string) => fieldsStore[name] ?? "";
  const [isExporting, setIsExporting] = useState(false);
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [saveName, setSaveName] = useState("");

  const user = userInfo?.user;
  const { savedForms, isSaving, deletingId, save, remove } =
    useUserTemplateData(user?.id, templateId);

  const buildFilename = () => {
    const name = (fieldsStore["fullName"] ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replaceAll(/[\u0300-\u036f]/g, "")
      .replaceAll(/\s+/g, "_")
      .replaceAll(/[^a-z0-9_]/g, "");
    const date = (fieldsStore["date"] ?? "").replaceAll("-", "");
    return `cc_${name}_${date}.pdf`;
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      const base64 = await exportToPdfAction(fieldsStore);
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = buildFilename();
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al generar el PDF.";
      errorToast(message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    const trimmed = saveName.trim();
    if (!trimmed) return;
    await save(trimmed, fieldsStore);
    setSaveName("");
    setShowSaveInput(false);
  };

  const handleLoad = (data: Record<string, string>) => {
    const updatedFields = fields.map((field) => ({
      ...field,
      defaultValue: data[field.name] ?? field.defaultValue,
    }));
    resetFields(updatedFields);
  };

  useEffect(() => {
    if (!user) return resetFields(fields);

    const fieldsWithUserData = [...fields];
    fieldsWithUserData.forEach((field, index) => {
      const fieldUserData = user[field.name as keyof typeof user];
      if (fieldUserData) {
        fieldsWithUserData[index].defaultValue = fieldUserData.toString();
      }
    });
    resetFields(fieldsWithUserData);
  }, [resetFields, fields, user]);

  return (
    <div
      data-testid="template-cdc-container"
      className="template-container h-full justify-between pb-4 landscape:px-4 landscape:pr-0"
    >
      <CollapsiblePanel className="">
        <DynamicForm fields={fields} />
      </CollapsiblePanel>

      <div className="flex h-full w-full flex-col items-center justify-center gap-2 landscape:h-11/12 landscape:pt-10">
        <div className="flex w-full max-w-(--previewer-width,640px) flex-col gap-2 px-2">
          <div className="flex justify-end gap-2">
            {user && (
              <button
                data-testid="btn-save-form"
                onClick={() => setShowSaveInput((v) => !v)}
                className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-opacity hover:opacity-80"
              >
                <Save className="h-4 w-4" />
                Guardar
              </button>
            )}
            <button
              data-testid="btn-download-pdf"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? "Generando..." : "Descargar PDF"}
            </button>
          </div>

          {showSaveInput && (
            <div
              data-testid="save-form-panel"
              className="flex gap-2 rounded-md border border-border bg-background p-3"
            >
              <input
                data-testid="save-form-input"
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Nombre del formulario"
                className="flex-1 rounded-md border border-border bg-transparent px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                data-testid="btn-save-form-confirm"
                onClick={handleSave}
                disabled={isSaving || !saveName.trim()}
                className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
              >
                {isSaving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  "Guardar"
                )}
              </button>
              <button
                data-testid="btn-save-form-cancel"
                onClick={() => {
                  setShowSaveInput(false);
                  setSaveName("");
                }}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </button>
            </div>
          )}

          {user && savedForms.length > 0 && (
            <div
              data-testid="saved-forms-list"
              className="rounded-md border border-border bg-background"
            >
              <p className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">
                Formularios guardados
              </p>
              {savedForms.map((form) => (
                <div
                  key={form.id}
                  data-testid={`saved-form-item-${form.id}`}
                  className="flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-muted/40"
                >
                  <span className="flex-1 truncate">{form.name}</span>
                  <div className="flex gap-1">
                    <button
                      data-testid={`btn-load-form-${form.id}`}
                      onClick={() => handleLoad(form.data)}
                      className="rounded px-2 py-1 text-xs text-primary hover:underline"
                    >
                      Cargar
                    </button>
                    <button
                      data-testid={`btn-delete-form-${form.id}`}
                      onClick={() => remove(form.id)}
                      disabled={deletingId === form.id}
                      className="rounded p-1 text-muted-foreground hover:text-destructive disabled:opacity-50"
                    >
                      {deletingId === form.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Previewer>
          <div className="m-6 text-sm">
            <strong className="right-block">
              {getFieldValue("city")},{" "}
              {DateAdapter.formatDisplayFromString(getFieldValue("date"))}
            </strong>
            <span className="center-title mt-16">
              {getFieldValue("company")}
            </span>
            <span className="center-subtitle mb-16">
              NIT: {getFieldValue("companyNit")}
            </span>
            <strong className="left-block">DEBE A:</strong>
            <span className="left-block accent-text">
              {getFieldValue("fullName")}
            </span>
            <span className="left-block mb-8">
              <span className="accent-text">CC</span> {getFieldValue("dni")}
            </span>
            <span className="left-block">
              <span className="accent-text">LA SUMA DE:</span>
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(Number(getFieldValue("amount")))}
            </span>
            <span className="left-block mb-8 text-sm">
              <strong>
                {NumberToWordsAdapter.fromString(getFieldValue("amount"))}
              </strong>{" "}
              En pesos Colombianos
            </span>
            <strong className="left-block">CONCEPTO:</strong>
            <span className="left-block">{getFieldValue("concept")}</span>

            <div className="my-8 flex flex-row flex-wrap items-center justify-start">
              {getFieldValue("dates") &&
                (getFieldValue("dates")?.split(",") || []).map((day) => {
                  return (
                    <p
                      key={day.toString()}
                      className="flex w-1/3 flex-row pl-4 font-medium"
                    >
                      <ChevronRight className="scale-75" />
                      <span>{DateAdapter.formatDisplayFromString(day)}</span>
                    </p>
                  );
                })}
            </div>
            <span className="left-block">Por favor consignar en:</span>
            <span className="left-block">
              Cuenta de <span className="accent-text">ahorros</span> No.{" "}
              <span className="accent-text">
                {getFieldValue("accountNumber")}
              </span>
            </span>
            <span className="left-block mb-8">
              Banco:{" "}
              <span className="accent-text">{getFieldValue("bank")}</span>
            </span>
            <span className="left-block mb-16">Atentamente,</span>
            <div className="left-block mb-8">
              {getFieldValue("signature") ? (
                <Image
                  src={getFieldValue("signature")}
                  alt="Firma"
                  width={300}
                  height={300}
                  className="max-h-16 w-auto max-w-52 object-contain"
                />
              ) : (
                <strong>____________________________________</strong>
              )}
            </div>
            <strong className="left-block mb-2">Información tributaria</strong>
            <span className="left-block mb-1">
              No soy responsable de IVA, ni de IMPOCONSUMO y no estoy obligado a
              facturar.
            </span>
            <p>
              De acuerdo con lo establecido en el parágrafo 2 del artículo 383
              del estatuto tributario, declaro que para la prestación del
              servicio no he contratado o vinculado dos (2) personas o más
              trabajadores asociados a dicha actividad. Solicito que lo anterior
              sea tenido en cuenta para efectos de retención en la fuente.
            </p>
          </div>
        </Previewer>
      </div>
    </div>
  );
};
