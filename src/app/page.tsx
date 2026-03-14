import { Button } from "@/presentation/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-6">
      <Button>
        <Link href="/login">Login</Link>
      </Button>
      <Button>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
}
