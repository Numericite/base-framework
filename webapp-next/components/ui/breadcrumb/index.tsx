import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

interface BreadcrumbProps {
  path: object;
  toggleState: (show: boolean) => void;
}

const CustomBreadcrumb: React.FC<BreadcrumbProps> = (props) => {
  let { path, toggleState } = props;

  return (
    <Box
      bgGradient="linear(to-r, #2F80ED, #97F8B1)"
      transition="linear-gradient 0.2s ease-in-out"
      p={"1px"}
      borderRadius={"xl"}
      my={4}
      display="flex"
      pos="relative"
      alignItems="center"
    >
      <Flex
        borderRadius={"xl"}
        bg="white"
        w="100%"
        flexWrap="wrap"
        justifyContent={"space-between"}
        alignItems="center"
        p={2}
      >
        <Box w="80%" display="flex" alignItems="center">
          <Image src="/chatbot/Rob.png" alt="Rob" mr={4} />
          <Breadcrumb
            w="80%"
            className="breadcrumb-custom"
            sx={{ ol: { flexWrap: "wrap" } }}
          >
            {Object.values(path).map((p, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  fontSize="20px"
                  wordBreak="normal"
                  fontWeight="600"
                  color="#204064"
                  bgGradient={
                    index === Object.keys(path).length - 1
                      ? "linear-gradient(180deg, #97F8B1 0%, #2F6CFF 100%)"
                      : ""
                  }
                  bgClip={index === Object.keys(path).length - 1 ? "text" : ""}
                >
                  {p}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </Box>
        <Flex
          alignItems="center"
          cursor="pointer"
          pr={4}
          onClick={() => toggleState(true)}
        >
          <EditIcon color="blue" mr={1} />
          <Text fontWeight={"600"} fontSize="14px" color="#204064">
            Modifier ma recherche
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CustomBreadcrumb;
