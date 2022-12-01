import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import themeExtendObject from "../utils/globals/chakra-theme";
import { ReactNode, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { TUser } from "./api/users/types";
import { useLocalStorage } from "react-use";
import AppContext from "../context/state";
import { ModalProvider } from "../utils/hooks/useModals";
import "@fontsource/poppins";

const NEXT_PUBLIC_JWT_STORAGE_KEY: string = process.env
  .NEXT_PUBLIC_JWT_STORAGE_KEY as string;

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme(themeExtendObject);
  const router = useRouter();
  const [user, setUser] = useState<TUser>({} as TUser);
  const [jwt, setJwt] = useLocalStorage<string | null>(
    NEXT_PUBLIC_JWT_STORAGE_KEY,
    null
  );

  const updateJwt = (tmpJwt: string | null) => {
    setJwt(tmpJwt);
  };

  const updateUser = (tmpUser: TUser) => {
    setUser(tmpUser);
  };

  const contextValue = {
    jwt,
    updateJwt,
    user,
    updateUser,
  };

  const getLayout = (children: ReactNode) => {
    return <PublicLayout>{children}</PublicLayout>;
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ChakraProvider theme={theme}>
        <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
      </ChakraProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
