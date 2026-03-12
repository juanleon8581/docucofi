import { toast } from "sonner";

export const successToast = (
  title: string,
  description?: string,
  duration?: number,
) => {
  toast.success(title, {
    description,
    duration: duration ?? 3000,
    classNames: {
      toast: "bg-green-50! text-green-400!",
      description: "text-green-300!",
    },
  });
};

export const errorToast = (
  title: string,
  description?: string,
  duration?: number,
) => {
  toast.error(title, {
    description,
    duration: duration ?? 3000,
    classNames: {
      toast: "bg-red-50! text-red-400!",
      description: "text-red-300!",
    },
  });
};
