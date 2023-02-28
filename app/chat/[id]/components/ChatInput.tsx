"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../../../../utils/firebase";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const ChatInput = ({ id }: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  const { data: session } = useSession();

  // useSWR to get the model

  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      message
    );

    const notification = toast.loading("Thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId: id,
        model,
        session,
      }),
    }).then(() => {
      toast.success("Responded!!", { id: notification });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
          className="bg-transparent focus:outline-none flex-1 diabled:cursor-not-allowed disabled-text-gray-300"
          disabled={!session}
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>
      <div className="">{/* ModalSelection */}</div>
    </div>
  );
};

export default ChatInput;
