import { handleEnquiry } from "@/lib/enquiry-delivery";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleEnquiry(request);
}
