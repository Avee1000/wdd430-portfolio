import { workHistory } from "@/data/workHistory";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(workHistory);
}
