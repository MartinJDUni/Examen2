import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {

        ...req.body,
        model: "gpt-3.5-turbo", // Especifica el modelo que deseas utilizar
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:");
    res.status(500).json({ error: "An error occurred." });
  }
}