import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../utils/query";
import admin from "firebase-admin";
import { adminDB } from "../../utils/firebaseAdmin";

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

  const message: Message = {
    text: response || "Unable to find an answer. Please try again later.",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "openai-model",
      name: `OpenAI Model - ${model}`,
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
