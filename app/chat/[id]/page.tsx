import ChatInput from "./components/ChatInput";
import Chats from "./components/Chats";

type Props = {};

const ChatPage = (props: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chats />
      <ChatInput />
    </div>
  );
};

export default ChatPage;
