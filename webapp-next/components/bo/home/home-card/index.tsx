import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  count: number;
  icon: JSX.Element;
  isLoading?: boolean;
}

const HomeCard = (props: Props) => {
  const { title, count, icon, isLoading } = props;
  return (
    <Box
      shadow={"md"}
      my={3}
      p={0.9}
      borderRadius="xl"
      bgGradient="linear(to-r, #2F80ED, #97F8B1)"
      _hover={{
        borderRadius: "xl",
        bgGradient: "linear(to-t, #2F80ED, #97F8B1)",
        transition: "linear-gradient 0.2s ease-in-out",
      }}
      transition="linear-gradient 0.2s ease-in-out"
    >
      <Box
        bg="white"
        _hover={{
          bgGradient:
            "linear(to-tr, rgba(47, 108, 255, 0.05),rgba(151, 248, 177, 0.05))",
        }}
        p={4}
        borderRadius="xl"
      >
        <Flex align="center" w="fit-content" justify="space-between">
          <Box mr={3}>{icon}</Box>
          <Text>{title}</Text>
        </Flex>
        {isLoading ? (
          <Skeleton height="20px" />
        ) : (
          <Flex w="full" justifyContent={"center"}>
            <Text
              fontSize="2xl"
              bgGradient="linear(to-t, #2F80ED, #97F8B1)"
              bgClip="text"
              fontWeight="bold"
            >
              {count}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default HomeCard;
