import { CollapsiblePanel } from "@/presentation/components/CollapsiblePanel/CollapsiblePanel";
import { Previewer } from "../../Previewer/Previewer";

export const TemplateCuentaDeCobro = () => {
  return (
    <div
      data-testid="template-cdc-container"
      className="template-container h-full justify-between pb-4 landscape:p-4 landscape:pr-0"
    >
      <CollapsiblePanel className="">
        <p>Futuro formulario, contenido temporal.</p>
      </CollapsiblePanel>

      <div className="flex h-full w-full items-center justify-center">
        <Previewer>
          <div className="m-6">
            <strong className="right-block">
              INSERTE CIUDAD, 20 de marzo de 2026
            </strong>
            <span className="center-title mt-16">INSERTE EMPRESA S.A.S</span>
            <span className="center-subtitle mb-16">NIT: INSERTE NIT</span>
            <strong className="left-block">DEBE A:</strong>
            <span className="left-block accent-text">INSERTE NOMBRE</span>
            <span className="left-block mb-8">
              <span className="accent-text">CC</span> INSERTE CC
            </span>
            <span className="left-block">
              <span className="accent-text">LA SUMA DE:</span> $ 0
            </span>
            <span className="left-block mb-8 text-sm">
              INSERTE VALOR EN LETRAS
            </span>
            <strong className="left-block">CONCEPTO:</strong>
            <span className="left-block mb-8">INSERTE CONCEPTO</span>
            <span className="left-block">Por favor consignar en:</span>
            <span className="left-block">
              Cuenta de <span className="accent-text">ahorros</span> No.{" "}
              <span className="accent-text">1234567890</span>
            </span>
            <span className="left-block accent-text mb-8">INSERTE BANCO</span>
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
