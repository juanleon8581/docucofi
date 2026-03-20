import { type Locale } from "@/infrastructure/i18n/config";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function DashboardPage({ params }: Readonly<Props>) {
  const { lang } = await params;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome to the internal zone. Language: {lang}
      </p>
    </div>
  );
}
