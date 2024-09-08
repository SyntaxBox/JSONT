import { translateJSON } from "@/lib/utils";
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { json, language } = data;

    if (!json || !language) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    const translatedJSON = await translateJSON(JSON.parse(json), language); //await translateJSON(json, language);
    return new Response(JSON.stringify(translatedJSON));
  } catch (error) {
    console.error("Translation error:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
