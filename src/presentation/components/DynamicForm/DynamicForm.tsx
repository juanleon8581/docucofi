"use client";

import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { DatePicker } from "@/presentation/components/DatePicker/DatePicker";
import { FileInput } from "@/presentation/components/FileInput/FileInput";

interface Props {
  fields: TemplateFieldDefinition[];
}

export const DynamicForm = ({ fields }: Props) => {
  const storeFields = useTemplateStore((state) => state.fields);
  const setFieldValue = useTemplateStore((state) => state.setFieldValue);

  return (
    <form data-testid="dynamic-form" className="flex flex-col gap-6 p-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <Label htmlFor={field.name}>{field.label}</Label>
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
