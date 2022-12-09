import { Button, Flex, Heading } from "@chakra-ui/react";

const Feedback = () => {
  return (
    <Flex
      flexDir={"column"}
      w="full"
      border="1px solid #E9F1FF"
      alignItems={"center"}
      mx="auto"
      justifyContent={"center"}
      py={"2.125rem"}
    >
      <Heading fontSize="1.5xl">
        Est ce que cette page vous a été utile ?
      </Heading>
      <Flex mt={"2.125rem"} justifyContent="space-between">
        <Button mr={"0.875rem"}>Oui</Button>
        <Button variant="neutral">Non</Button>
      </Flex>
    </Flex>
  );
};

export default Feedback;
