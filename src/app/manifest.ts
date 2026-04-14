import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DocuCofi",
    short_name: "DocuCofi",
    description:
      "Gestiona tus documentos y plantillas de forma sencilla con DocuCofi.",
    start_url: "/es",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
  };
}
