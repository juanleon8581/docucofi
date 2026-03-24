"use client";

import { useEffect } from "react";
import { CollapsiblePanel } from "@/presentation/components/CollapsiblePanel/CollapsiblePanel";
import { Previewer } from "../../Previewer/Previewer";
import { DynamicForm } from "../../DynamicForm/DynamicForm";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import { cuentaDeCobroFields } from "./cuentaDeCobroFields";
import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";
import { NumberToWordsAdapter } from "@/infrastructure/adapters/NumberToWordsAdapter";

export const TemplateCuentaDeCobro = () => {
  const resetFields = useTemplateStore((state) => state.resetFields);
  const fields = useTemplateStore((state) => state.fields);
  const getFieldValue = (name: string) => fields[name] ?? "";

  useEffect(() => {
    resetFields(cuentaDeCobroFields);
  }, [resetFields]);

  return (
    <div
      data-testid="template-cdc-container"
      className="template-container h-full justify-between pb-4 landscape:px-4 landscape:pr-0"
    >
      <CollapsiblePanel className="">
        <DynamicForm fields={cuentaDeCobroFields} />
      </CollapsiblePanel>

      <div className="flex h-full w-full items-center justify-center">
        <Previewer>
          <div className="m-6">
            <strong className="right-block">
              {getFieldValue("ciudad")},{" "}
              {DateAdapter.formatDisplayFromString(getFieldValue("fecha"))}
            </strong>
            <span className="center-title mt-16">
              {getFieldValue("empresa")}
            </span>
            <span className="center-subtitle mb-16">
              NIT: {getFieldValue("nit")}
            </span>
            <strong className="left-block">DEBE A:</strong>
            <span className="left-block accent-text">
              {getFieldValue("nombre")}
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
              }).format(Number(getFieldValue("valor")))}
            </span>
            <span className="left-block mb-8 text-sm">
              <strong>
                {NumberToWordsAdapter.fromString(getFieldValue("valor"))}
              </strong>{" "}
              En pesos Colombianos
            </span>
            <strong className="left-block">CONCEPTO:</strong>
            <span className="left-block mb-8">{getFieldValue("concepto")}</span>
            <span className="left-block">Por favor consignar en:</span>
            <span className="left-block">
              Cuenta de <span className="accent-text">ahorros</span> No.{" "}
              <span className="accent-text">
                {getFieldValue("numeroCuenta")}
              </span>
            </span>
            <span className="left-block accent-text mb-8">
              {getFieldValue("banco")}
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
