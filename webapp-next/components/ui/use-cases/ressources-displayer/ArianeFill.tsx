import { Box, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  selectedIndex: number;
  stepsLength: number;
}

const ArianeFill = (props: Props) => {
  const { selectedIndex, stepsLength } = props;

  const steps = Array.from({ length: stepsLength }, (_, i) => i);

  return (
    <SimpleGrid mb={5} columns={stepsLength}>
      {steps.map((step, index) => {
        return (
          <Flex key={index} justifyContent="space-between">
            <Box
              w="34px"
              h="34px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="full"
              bg={index !== selectedIndex ? "white" : "primary"}
              border={index !== selectedIndex ? "1px solid #2f6cff" : "none"}
            >
              <Text
                fontSize="sm"
                color={index !== selectedIndex ? "primary" : "white"}
              >
                {step + 1}
              </Text>
            </Box>
            {index !== stepsLength - 1 && (
              <Box border={"1px solid #2f6cff"} w="full" />
            )}
          </Flex>
        );
      })}
    </SimpleGrid>
  );
};

export default ArianeFill;
