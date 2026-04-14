import * as z from "zod";
import { TemplateFieldData } from "@/domain/entities/Template";

export function generateTemplateSchema(
  fields: TemplateFieldData[],
): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};

  for (const field of fields) {
    if (field.isDisabled || field.isAuto) {
      shape[field.name] = z.string().optional().or(z.literal(""));
      continue;
    }

    switch (field.type) {
      case "select":
        shape[field.name] =
          field.options.length > 0
            ? z.enum(field.options as [string, ...string[]])
            : z.string().min(1);
        break;
      case "number":
        shape[field.name] = z
          .string()
          .min(1)
          .regex(/^\d+(\.\d+)?$/, "Must be a valid number");
        break;
      default:
        shape[field.name] = z.string().min(1);
    }
  }

  return z.object(shape);
}
