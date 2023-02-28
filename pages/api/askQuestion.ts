import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../utils/query";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a chatId!" });
    return;
  }

  const response = await query(prompt, model);

  //   const message: Message = {
  //     text: reponse || "Unable to find an answer. Please try again later."
  //   };
}
