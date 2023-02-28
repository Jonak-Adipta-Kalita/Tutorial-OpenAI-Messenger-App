import ChatInput from "./components/ChatInput";
import Chats from "./components/Chats";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chats id={id} />
      <ChatInput id={id} />
    </div>
  );
};

export default ChatPage;
