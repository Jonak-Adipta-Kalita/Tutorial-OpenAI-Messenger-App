import "../styles/globals.css";
import Providers from "./components/Providers";
import Sidebar from "./components/Sidebar";
import { getSession } from "next-auth/react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  return (
    <html>
      <head />
      <body>
        <Providers session={session}>
          {!session ? (
            <div></div>
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem] scrollbar-hide">
                <Sidebar />
              </div>
              {/* ClientProvider-Notifications */}
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
