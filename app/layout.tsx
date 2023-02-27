import "../styles/globals.css";
import Providers from "./components/Providers";
import { getSession } from "next-auth/react";
import Login from "./components/Login";
import MainBody from "./components/MainBody";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession(authOptions);

  return (
    <html>
      <body>
        <Providers session={session}>
          {!session ? <Login /> : <MainBody children={children} />}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
