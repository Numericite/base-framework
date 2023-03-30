import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { MenuItem } from "../../../layouts/PrivateLayout";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { destroyJwt } from "../../../utils/globals/cookies";
import { BiLogOut } from "react-icons/bi";

interface MenuProps {
  menuItems: MenuItem[];
}

const Menu = (props: MenuProps) => {
  const { menuItems } = props;
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState(-1);

  const isItemActive = (item: MenuItem) => {
    return item.link && router.pathname.includes(item.link);
  };

  const logout = () => {
    destroyJwt();
    router.push("/dashboard/login");
  };

  const handleClick = (id: number) => {
    if (selectedMenu !== id) setSelectedMenu(id);
    else setSelectedMenu(-1);
  };

  const displayIcon = (item: MenuItem) => {
    return (
      <Box color={isItemActive(item) ? "white" : "primary"}>{item.icon}</Box>
    );
  };

  return (
    <Box
      p={4}
      minW={72}
      position="sticky"
      top={0}
      display="flex"
      h="100vh"
      bg="#FAFCFF"
      borderRightWidth={1}
      borderRightColor="rgba(224, 225, 226, 0.157) 94.44%)"
      flexDirection="column"
      maxW={72}
    >
      <Box display="flex" mb={2}>
        <Box w="full" textAlign="center">
          <Text fontSize={["xl", "2xl"]} fontWeight={"bold"} mt={4} mb={10}>
            Ressourcerie{" "}
            <Text
              as="span"
              bgGradient="linear(to-t, #2F80ED, #97F8B1)"
              bgClip="text"
            >
              PFRH
            </Text>{" "}
          </Text>
          {menuItems.map((item) => (
            <Box key={item.id} mb={2}>
              <NextLink
                href={item.link ? item.link : ""}
                passHref={!!item.link}
              >
                <Link
                  role="group"
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  py={3.5}
                  px={5}
                  fontWeight="bold"
                  opacity={isItemActive(item) ? 1 : 0.8}
                  target={item.blank ? "_blank" : "_self"}
                  userSelect="none"
                  rounded="md"
                  _hover={{
                    opacity: 1,
                  }}
                  backgroundColor={
                    isItemActive(item) ? "#F6F6F9" : "transparent"
                  }
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  <Box
                    rounded="lg"
                    p={2}
                    bg={isItemActive(item) ? "primary" : "white"}
                    fontSize="xl"
                    color={isItemActive(item) ? "white" : "primary"}
                  >
                    {displayIcon(item)}
                  </Box>
                  <Text ml="4">{item.name}</Text>
                </Link>
              </NextLink>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt="auto" mb={2}>
        <Link
          onClick={logout}
          display="flex"
          w="full"
          justifyContent="center"
          alignItems="center"
        >
          <Box color="primary" mr={1}>
            <BiLogOut />
          </Box>
          <Text color="primary">Déconnexion</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Menu;
