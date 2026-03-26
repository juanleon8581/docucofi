import { create } from "zustand";
import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";

interface TemplateStoreState {
  fields: Record<string, string>;
  setFieldValue: (name: string, value: string) => void;
  resetFields: (fieldDefs: TemplateFieldDefinition[]) => void;
}

export const useTemplateStore = create<TemplateStoreState>((set) => ({
  fields: {},
  setFieldValue: (name, value) =>
    set((state) => ({ fields: { ...state.fields, [name]: value } })),
  resetFields: (fieldDefs) =>
    set({
      fields: Object.fromEntries(
        fieldDefs.map((f) => [f.name, f.defaultValue]),
      ),
    }),
}));
