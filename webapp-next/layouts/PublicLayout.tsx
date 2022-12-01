import { Box, Container, Image } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "../components/ui/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Box minH="100vh">
      <Navbar />
      <Container maxW="container.2lg" pt={10}>
        {children}
      </Container>
    </Box>
  );
}
