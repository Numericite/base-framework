import { Box, Spinner, Text } from "@chakra-ui/react";
import { LoaderProps } from "./interface";

const Loader = ({ message }: LoaderProps) => {
  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Spinner color="primary" size="xl" />
      {message && (
        <Text as="b" mt={6} color="primary">
          {message}
        </Text>
      )}
    </Box>
  );
};

export default Loader;
