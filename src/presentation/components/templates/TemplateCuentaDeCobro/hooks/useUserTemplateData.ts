import { useState, useEffect, useCallback } from "react";
import {
  getUserTemplateDataListAction,
  saveUserTemplateDataAction,
  deleteUserTemplateDataAction,
  type SavedFormItem,
} from "@/app/[lang]/templates/[slug]/actions";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";

export function useUserTemplateData(
  userId: string | undefined,
  templateId: string,
) {
  const [savedForms, setSavedForms] = useState<SavedFormItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      const list = await getUserTemplateDataListAction(userId, templateId);
      setSavedForms(list);
    } catch {
      // silent — empty list is an acceptable fallback
    }
  }, [userId, templateId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = async (name: string, data: Record<string, string>) => {
    if (!userId) return;
    setIsSaving(true);
    try {
      await saveUserTemplateDataAction(userId, templateId, name, data);
      await refresh();
      successToast("Formulario guardado");
    } catch (error) {
      errorToast(
        error instanceof Error ? error.message : "Error al guardar.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteUserTemplateDataAction(id);
      setSavedForms((prev) => prev.filter((f) => f.id !== id));
      successToast("Formulario eliminado");
    } catch (error) {
      errorToast(
        error instanceof Error ? error.message : "Error al eliminar.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return { savedForms, isSaving, deletingId, save, remove };
}
