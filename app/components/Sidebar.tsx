"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../utils/firebase";
import ChatRow from "./ChatRow";
import ModalSelection from "../chat/[id]/components/ModalSelection";

type Props = {};

const Sidebar = (props: Props) => {
  const { data: session } = useSession();
  const [chats, chatsLoading, chatsError] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="space-y-3">
          <NewChat />
          <div className="hidden sm:inline">
            <ModalSelection />
          </div>
          {chats?.docs?.length! > 0 ? (
            chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)
          ) : (
            <p className="text-center text-sm md:text-lg mt-2 md:mt-5 text-white">
              Loading...
            </p>
          )}
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          src={session?.user?.image!}
        />
      )}
    </div>
  );
};

export default Sidebar;
