import { Box, Image } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <Box minH="100vh">{children}</Box>;
}
