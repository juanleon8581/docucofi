import { beforeEach, describe, expect, it, vi } from "vitest";
import { errorToast, successToast } from "./toast.controller";
import * as generalToast from "./toast.controller";

// Mock the sonner library
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast as toastMocked } from "sonner";

describe("toast.controller.test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("success toast", () => {
    it("should be a function", () => {
      expect(successToast).toBeInstanceOf(Function);
    });

    it("should call with only required params", () => {
      const basicOptions = {
        classNames: {
          description: "text-green-300!",
          toast: "bg-green-50! text-green-400!",
        },
        duration: 3000,
      };
      const mockTitle = "test title";
      const successToastSpy = vi.spyOn(generalToast, "successToast");
      successToast(mockTitle);
      expect(toastMocked.success).toHaveBeenCalled();
      expect(toastMocked.success).toHaveBeenCalledWith(mockTitle, basicOptions);
      expect(successToastSpy).toHaveBeenCalledWith(mockTitle);
    });

    it("should call with all params", () => {
      const mockTitle = "test title";
      const mockDescription = "test description";
      const mockDuration = 5000;
      const successToastSpy = vi.spyOn(generalToast, "successToast");
      successToast(mockTitle, mockDescription, mockDuration);
      expect(toastMocked.success).toHaveBeenCalled();
      expect(toastMocked.success).toHaveBeenCalledWith(mockTitle, {
        description: mockDescription,
        duration: mockDuration,
        classNames: {
          description: "text-green-300!",
          toast: "bg-green-50! text-green-400!",
        },
      });
      expect(successToastSpy).toHaveBeenCalledWith(
        mockTitle,
        mockDescription,
        mockDuration,
      );
    });
  });

  describe("error toast", () => {
    it("should be a function", () => {
      expect(errorToast).toBeInstanceOf(Function);
    });

    it("should call with only required params", () => {
      const basicOptions = {
        classNames: {
          toast: "bg-red-50! text-red-400!",
          description: "text-red-300!",
        },
        duration: 3000,
      };
      const mockTitle = "test title";
      const errorToastSpy = vi.spyOn(generalToast, "errorToast");
      errorToast(mockTitle);
      expect(toastMocked.error).toHaveBeenCalled();
      expect(toastMocked.error).toHaveBeenCalledWith(mockTitle, basicOptions);
      expect(errorToastSpy).toHaveBeenCalledWith(mockTitle);
    });

    it("should call with all params", () => {
      const mockTitle = "test title";
      const mockDescription = "test description";
      const mockDuration = 5000;
      const errorToastSpy = vi.spyOn(generalToast, "errorToast");
      errorToast(mockTitle, mockDescription, mockDuration);
      expect(toastMocked.error).toHaveBeenCalled();
      expect(toastMocked.error).toHaveBeenCalledWith(mockTitle, {
        description: mockDescription,
        duration: mockDuration,
        classNames: {
          toast: "bg-red-50! text-red-400!",
          description: "text-red-300!",
        },
      });
      expect(errorToastSpy).toHaveBeenCalledWith(
        mockTitle,
        mockDescription,
        mockDuration,
      );
    });
  });
});
