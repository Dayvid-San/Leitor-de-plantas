import type { Metadata } from "next"
import { CurriculosClient } from "./curriculos-client"

export const metadata: Metadata = {
  title: "Currículos - Dayvid Santana",
  robots: { index: false, follow: false },
}

export default function CurriculosPage() {
  return <CurriculosClient />
}
