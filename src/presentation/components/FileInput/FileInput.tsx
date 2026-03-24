"use client";

import Image from "next/image";
import { useRef } from "react";

interface FileInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  "data-testid"?: string;
}

export function FileInput({
  value,
  onChange,
  id,
  "data-testid": dataTestId,
}: Readonly<FileInputProps>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        id={id}
        data-testid={dataTestId}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:cursor-pointer"
        onChange={handleChange}
      />
      {value ? (
        <Image
          src={value}
          alt="Firma"
          width={300}
          height={300}
          data-testid={dataTestId ? `${dataTestId}-preview` : undefined}
          className="max-h-16 w-auto rounded border object-contain"
        />
      ) : (
        <span
          data-testid={dataTestId ? `${dataTestId}-placeholder` : undefined}
          className="text-xs text-muted-foreground"
        >
          Sin imagen seleccionada
        </span>
      )}
    </div>
  );
}
