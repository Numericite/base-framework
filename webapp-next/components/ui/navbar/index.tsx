import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import MobileDrawer from "../mobile-drawer";
import { useMediaQueryAdapter } from "../../../utils/hooks/useMediaQuery";
import NextLink from "next/link";

const Navbar: React.FC = () => {
  const router = useRouter();

  const isLargerThan768 = useMediaQueryAdapter("(min-width: 768px)");

  if (isLargerThan768 === null) return <></>;

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Ressources", href: "/ressources" },
    { label: "Contribution", href: "/contribution" },
    { label: "A propos", href: "/about" },
  ];

  const displayLinks = links.map((link, index) => {
    return (
      <NextLink key={index} href={link.href}>
        <Link
          color={router.pathname === link.href ? "primary" : ""}
          fontWeight={router.pathname === link.href ? "bold" : "inherit"}
          _hover={{ color: "primary" }}
        >
          {link.label}
        </Link>
      </NextLink>
    );
  });

  const displayDrawer = () => {
    return <MobileDrawer displayLinks={displayLinks} />;
  };

  return (
    <Box width={"100%"} border={"1px solid #E9F1FF"} py={9}>
      <Container maxW="container.2lg">
        <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
          <HStack>
            <Image src="/Mariane.png" alt="Marianne" />
            <NextLink href="/">
              <Flex cursor="pointer" userSelect="none">
                <Heading fontSize="2xl"> Ressourcerie</Heading>
                <Heading
                  fontSize="2xl"
                  bgGradient="linear(to-t, #2F80ED, #97F8B1)"
                  bgClip="text"
                  ml={1.5}
                >
                  PFRH
                </Heading>
              </Flex>
            </NextLink>
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
