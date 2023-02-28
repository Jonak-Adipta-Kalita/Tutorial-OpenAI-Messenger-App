"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../../utils/firebase";

type Props = {
  id: string;
};

const Chats = ({ id }: Props) => {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1">
      {messages?.docs?.length! > 0 ? (
        messages?.docs.map((message) => <></>)
      ) : (
        <div>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default Chats;
