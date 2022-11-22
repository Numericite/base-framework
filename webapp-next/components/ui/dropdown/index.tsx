import { useState, useRef } from "react";
import { Button, useOutsideClick, Box, Text } from "@chakra-ui/react";
import { ButtonDropdownProps } from "./interfaces";

const UIButtonDropdown = (props: ButtonDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  useOutsideClick({
    ref: ref,
    handler: () => setShowOptions(false),
  });

  return (
    <Box ref={ref} position="relative" display="inline-block">
      <Button
        type="button"
        size={props.size || "lg"}
        rounded={props.isRounded ? "md" : "none"}
        variant={props.isOutline ? "outline" : "solid"}
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        {props.children}
      </Button>
      {showOptions && (
        <Box
          position="absolute"
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          w="full"
          zIndex={100}
        >
          {props.options.map((opt, index) => {
            return (
              <Text
                key={index}
                _hover={{ bg: "infoLight" }}
                bg={opt.value === props.value ? "infoLight" : "white"}
                cursor="pointer"
                px={2}
                py={3}
                onClick={() => {
                  setShowOptions(false);
                  if (props.onChange) props.onChange(opt.value);
                }}
              >
                {opt.label}
              </Text>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default UIButtonDropdown;
