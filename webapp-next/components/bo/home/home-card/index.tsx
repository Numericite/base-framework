import {
  Box,
  Flex,
  Skeleton,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";

interface Props {
  title: string;
  count: number;
  icon: JSX.Element;
  bgColor: string;
  isLoading?: boolean;
}

const HomeCard = (props: Props) => {
  const { title, count, icon, isLoading, bgColor } = props;
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
      <StatGroup
        bg="white"
        _hover={{
          bgGradient:
            "linear(to-tr, rgba(47, 108, 255, 0.05),rgba(151, 248, 177, 0.05))",
        }}
        p={4}
        borderRadius="xl"
      >
        <Stat>
          <Flex align="center" w="fit-content" justify="space-between">
            <StatLabel display="flex" flexDir={"row"} alignItems="center">
              <Box mr={3} p={3} borderRadius="xl" bg={bgColor}>
                {icon}
              </Box>
              <Text>{title}</Text>
            </StatLabel>
          </Flex>
          {isLoading ? (
            <Skeleton height="20px" />
          ) : (
            <>
              <Flex w="full" justifyContent={"center"} my={1}>
                <StatNumber
                  fontSize="3xl"
                  bgGradient="linear(to-t, #2F80ED, #97F8B1)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  {count}
                </StatNumber>
              </Flex>
            </>
          )}
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default HomeCard;
