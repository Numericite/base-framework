import { Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { useMediaQuery } from "usehooks-ts";
import MobileDrawer from "../mobile-drawer";

const Navbar: React.FC = () => {
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
        _selected={{ color: "primary" }}
        _hover={{ color: "primary", fontWeight: "600" }}
      >
        {link.label}
      </Link>
    );
  });

  const displayDrawer = () => {
    return <MobileDrawer displayLinks={displayLinks} />;
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      border={"1px solid #E9F1FF"}
      w="full"
      py={9}
      px={36}
    >
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
      <HStack justifyContent={"space-between"} gap={5}>
        {isLargerThan768 ? displayLinks : displayDrawer()}
      </HStack>
    </Flex>
  );
};

export default Navbar;
