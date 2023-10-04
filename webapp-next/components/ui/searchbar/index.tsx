import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { SearchbarProps } from "./interface";

const UISearchbar = (props: SearchbarProps) => {
  return (
    <InputGroup width={props.size} ml={3}>
      <Input
        w="full"
        bgColor="neutral.900"
        borderRadius="2xl"
        placeholder={props.placeholder}
        onChange={props.onSearch}
      />
      <InputRightElement>
        <SearchIcon color="neutral.500" />
      </InputRightElement>
    </InputGroup>
  );
};

export default UISearchbar;
