import { Box, Container, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/router";
import MobileDrawer from "../mobile-drawer";

const Navbar: React.FC = () => {
  const router = useRouter();

  const isLargerThan768 = useMediaQuery("(min-width: 768px)");

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Ressources", href: "/ressources" },
    { label: "Contribution", href: "/contribution" },
    { label: "A propos", href: "/about" },
    { label: "Articles", href: "/articles" },
  ];

  const displayLinks = links.map((link, index) => {
    return (
      <Link
        key={index}
        href={link.href}
        color={router.pathname === link.href ? "primary" : ""}
        fontWeight={router.pathname === link.href ? "bold" : "inherit"}
        _hover={{ color: "primary" }}
      >
        {link.label}
      </Link>
    );
  });

  const displayDrawer = () => {
    return <MobileDrawer displayLinks={displayLinks} />;
  };

  return (
    <Box border={"1px solid #E9F1FF"} py={9}>
      <Container maxW="container.2lg">
        <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
          <HStack>
            <Heading fontSize="2xl"> Ressourcerie</Heading>
            <Heading
              fontSize="2xl"
              bgGradient="linear(to-t, #2F80ED, #97F8B1)"
              bgClip="text"
            >
              {" "}
              PFRH
            </Heading>
          </HStack>
          <HStack justifyContent={"space-between"} gap={10}>
            {isLargerThan768 ? displayLinks : displayDrawer()}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
