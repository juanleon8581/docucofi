"use client";

import { useParams } from "next/navigation";
import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { DatePicker } from "@/presentation/components/DatePicker/DatePicker";
import { FileInput } from "@/presentation/components/FileInput/FileInput";
import type { Locale } from "@/infrastructure/i18n/config";

const updateFieldLabels: Record<Locale, string> = {
  es: "actualizar",
  en: "update",
};

interface Props {
  fields: TemplateFieldDefinition[];
  selectedSaveFields?: Set<string>;
  onToggleSaveField?: (name: string) => void;
}

export const DynamicForm = ({
  fields,
  selectedSaveFields,
  onToggleSaveField,
}: Props) => {
  const storeFields = useTemplateStore((state) => state.fields);
  const setFieldValue = useTemplateStore((state) => state.setFieldValue);
  const { lang } = useParams<{ lang: Locale }>();
  const updateFieldLabel = updateFieldLabels[lang] ?? updateFieldLabels.es;

  return (
    <form data-testid="dynamic-form" className="flex flex-col gap-6 p-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={field.name}>{field.label}</Label>
            {onToggleSaveField && !field.disabledField && !field.isAuto && (
              <Label className="flex cursor-pointer items-center gap-1 text-xs">
                <Input
                  type="checkbox"
                  data-testid={`save-field-checkbox-${field.name}`}
                  checked={selectedSaveFields?.has(field.name) ?? false}
                  onChange={() => onToggleSaveField(field.name)}
                  className="h-3 w-3 accent-primary"
                />
                {updateFieldLabel}
              </Label>
            )}
          </div>
          {field.type === "date" && (
            <DatePicker
              id={field.name}
              data-testid={`field-${field.name}`}
              value={storeFields[field.name] ?? ""}
              onChange={(val) => setFieldValue(field.name, val)}
              dateMode={field.dateMode ?? "single"}
              placeholder={field.placeholder}
            />
          )}
          {field.type === "file" && (
            <FileInput
              id={field.name}
              data-testid={`field-${field.name}`}
              value={storeFields[field.name] ?? ""}
              onChange={(val) => setFieldValue(field.name, val)}
            />
          )}
          {field.type !== "date" && field.type !== "file" && (
            <Input
              id={field.name}
              data-testid={`field-${field.name}`}
              type={field.type === "number" ? "number" : "text"}
              value={storeFields[field.name] ?? field.defaultValue}
              placeholder={field.placeholder}
              onChange={(e) => setFieldValue(field.name, e.target.value)}
            />
          )}
        </div>
      ))}
    </form>
  );
};
