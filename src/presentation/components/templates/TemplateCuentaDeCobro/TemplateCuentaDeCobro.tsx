"use client";

import { useEffect } from "react";
import { CollapsiblePanel } from "@/presentation/components/CollapsiblePanel/CollapsiblePanel";
import { Previewer } from "../../Previewer/Previewer";
import { DynamicForm } from "../../DynamicForm/DynamicForm";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";

import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";
import { NumberToWordsAdapter } from "@/infrastructure/adapters/NumberToWordsAdapter";
import { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { ChevronRight } from "lucide-react";

export const TemplateCuentaDeCobro = ({
  fields,
}: {
  fields: TemplateFieldDefinition[];
}) => {
  const resetFields = useTemplateStore((state) => state.resetFields);
  const fieldsStore = useTemplateStore((state) => state.fields);
  const getFieldValue = (name: string) => fieldsStore[name] ?? "";

  useEffect(() => {
    resetFields(fields);
  }, [resetFields, fields]);

  return (
    <div
      data-testid="template-cdc-container"
      className="template-container h-full justify-between pb-4 landscape:px-4 landscape:pr-0"
    >
      <CollapsiblePanel className="">
        <DynamicForm fields={fields} />
      </CollapsiblePanel>

      <div className="flex h-full w-full items-center justify-center">
        <Previewer>
          <div className="m-6">
            <strong className="right-block">
              {getFieldValue("city")},{" "}
              {DateAdapter.formatDisplayFromString(getFieldValue("date"))}
            </strong>
            <span className="center-title mt-16">
              {getFieldValue("company")}
            </span>
            <span className="center-subtitle mb-16">
              NIT: {getFieldValue("nit")}
            </span>
            <strong className="left-block">DEBE A:</strong>
            <span className="left-block accent-text">
              {getFieldValue("name")}
            </span>
            <span className="left-block mb-8">
              <span className="accent-text">CC</span> {getFieldValue("cc")}
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
              {(getFieldValue("dates")?.split(",") || []).map((day) => {
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
            <strong className="left-block mb-8">
              ____________________________________
            </strong>
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
