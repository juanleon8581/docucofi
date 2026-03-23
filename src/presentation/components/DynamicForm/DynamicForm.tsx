"use client";

import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";

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
          <Input
            id={field.name}
            data-testid={`field-${field.name}`}
            type={field.type === "number" ? "number" : "text"}
            value={storeFields[field.name] ?? field.defaultValue}
            placeholder={field.placeholder}
            onChange={(e) => setFieldValue(field.name, e.target.value)}
          />
        </div>
      ))}
    </form>
  );
};
