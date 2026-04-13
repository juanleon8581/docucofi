import { config } from "dotenv"
import { defineConfig } from "prisma/config"

// Load .env.local first (Next.js convention), then .env as fallback
config({ path: ".env.local" })
config({ path: ".env" })

export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL ?? "",
  },
})
