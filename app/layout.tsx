import "../styles/globals.css";
import Providers from "./components/Providers";
import { getServerSession } from "next-auth";
import Login from "./components/Login";
import MainBody from "./components/MainBody";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

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
