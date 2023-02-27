import "../styles/globals.css";
import Providers from "./components/Providers";
import { getSession } from "next-auth/react";
import Login from "./components/Login";
import MainBody from "./components/MainBody";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  return (
    <html>
      <head></head>
      <body>
        <Providers session={session}>
          {!session ? <Login /> : <MainBody children={children} />}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
