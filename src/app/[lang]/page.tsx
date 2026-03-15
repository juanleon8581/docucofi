import { Github } from "lucide-react";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import { Locale } from "@/infrastructure/i18n/config";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";
import { Logo } from "@/presentation/components/Logo/Logo";

interface Props {
  params: Promise<{ lang: Locale }>;
}

const TECH_STACK = [
  { label: "Next.js 16", className: "bg-black text-white" },
  { label: "React 19", className: "bg-[#61DAFB] text-black" },
  { label: "TypeScript", className: "bg-[#3178C6] text-white" },
  { label: "Supabase Auth", className: "bg-[#3ECF8E] text-black" },
  { label: "Tailwind v4", className: "bg-[#38BDF8] text-black" },
  { label: "shadcn/ui", className: "bg-zinc-800 text-white" },
  { label: "Clean Architecture", className: "bg-violet-600 text-white" },
  { label: "i18n EN/ES", className: "bg-amber-400 text-black" },
  { label: "Vitest", className: "bg-[#6E9F18] text-white" },
  { label: "PNPM", className: "bg-[#F69220] text-black" },
] as const;

const GITHUB_URL = "https://github.com/juanleon8581/coficode-auth";

export default async function Home({ params }: Readonly<Props>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <LocalizedLink href="/login" locale={lang}>
                {dict.login.submitButton}
              </LocalizedLink>
            </Button>
            <Button asChild>
              <LocalizedLink href="/register" locale={lang}>
                {dict.register.submitButton}
              </LocalizedLink>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center">
        {/* Title & description */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {dict.home.title}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            {dict.home.description}
          </p>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {TECH_STACK.map((tech) => (
            <Badge key={tech.label} className={tech.className}>
              {tech.label}
            </Badge>
          ))}
        </div>

        {/* GitHub CTA */}
        <Button variant="outline" size="lg" asChild>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Github />
            {dict.home.githubButton}
          </a>
        </Button>
      </section>
    </main>
  );
}
