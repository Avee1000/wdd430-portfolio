import { workHistory } from "@/data/workHistory";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(workHistory, {
    headers: { "Content-Type": "application/json" },
  });
}
