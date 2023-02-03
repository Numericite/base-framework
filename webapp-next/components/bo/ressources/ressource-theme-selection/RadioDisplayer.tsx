import { Flex, Radio, RadioGroup, SimpleGrid, Text } from "@chakra-ui/react";

interface RadioDisplayerProps<TItems> {
  items: TItems[] | undefined;
}

const RadioDisplayer = <TItems extends { id: number; name: string }>(
  props: RadioDisplayerProps<TItems>
) => {
  const { items } = props;
  return (
    <RadioGroup>
      <SimpleGrid
        columns={4}
        spacing={4}
        py={3}
        bg="neutral"
        minW="full"
        px={2}
      >
        {items?.map((item) => (
          <Flex flexDir="row" align="center" justify="flex-start" key={item.id}>
            <Text size="md" pr={2}>
              {item.name}
            </Text>
            <Radio />
          </Flex>
        ))}
      </SimpleGrid>
    </RadioGroup>
  );
};

export default RadioDisplayer;
