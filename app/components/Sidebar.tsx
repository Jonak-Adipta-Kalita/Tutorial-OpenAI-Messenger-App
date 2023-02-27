import NewChat from "./NewChat";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="">
          <NewChat />
          <div className="">{/* ModalSelection */}</div>
          {/* ChatRows */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
