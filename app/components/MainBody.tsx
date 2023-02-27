import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

const MainBody = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem] scrollbar-hide">
        <Sidebar />
      </div>
      {/* ClientProvider-Notifications */}
      <div className="bg-[#343541] flex-1">{children}</div>
    </div>
  );
};

export default MainBody;
