import type { NextApiRequest, NextApiResponse } from "next";

type Quote = {
  quote: string;
  author: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quote | { error: string }>
) {
  const category = "happiness";

  const apiKey = process.env.API_NINJA_API_KEY;
  const apiUrl = "https://api.api-ninjas.com/v1/quotes";

  try {
    const response: Response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey || "",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error status: ${response.status} message: ${response.statusText}`
      );
    }

    const quotes = (await response.json()) as Quote[];

    if (!quotes || quotes.length === 0 || !quotes[0]) {
      throw new Error(`No quotes found`);
    }

    const firstQuote = quotes[0];

    res.status(200).json(firstQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch quote" });
  }
}
