import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "../components/ui/footer";
import Navbar from "../components/ui/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Box minH="100vh" minW="100%">
        <Navbar />
        {children}
      </Box>
      <Footer />
    </>
  );
}
