import { ComponentType } from "react";
import { TemplateCuentaDeCobro } from "./TemplateCuentaDeCobro/TemplateCuentaDeCobro";
import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import type { IAuthResponse } from "@/domain/interfaces/IAuthResponse";

export type TemplateComponentProps = {
  fields: TemplateFieldDefinition[];
  userInfo: IAuthResponse | null;
};

export const templateComponents: Record<
  string,
  ComponentType<TemplateComponentProps>
> = {
  "cuenta-de-cobro": TemplateCuentaDeCobro,
  "cuenta-de-cobro-concepto-fechas": TemplateCuentaDeCobro,
};
