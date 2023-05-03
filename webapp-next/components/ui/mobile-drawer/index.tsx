import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import React from 'react';

interface DrawerProps {
  displayLinks: JSX.Element[];
}

const MobileDrawer = (props: DrawerProps) => {
  const { displayLinks } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Flex>
      <Button size="sm" ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text>
              Ressourcerie
              <Text bgGradient="linear(to-t, #97F8B1, #2F80ED)" bgClip="text">
                PFRH
              </Text>
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack>{displayLinks}</VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default MobileDrawer;
