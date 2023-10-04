import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Image,
  Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import MobileDrawer from '../mobile-drawer';
import { useMediaQueryAdapter } from '../../../utils/hooks/useMediaQuery';
import NextLink from 'next/link';

const Navbar: React.FC = () => {
  const router = useRouter();

  const isLargerThan768 = useMediaQueryAdapter('(min-width: 768px)');

  if (isLargerThan768 === null) return <></>;

  const links = [
    { label: 'Accueil', href: '/' },
    { label: 'Ressources', href: '/ressources' },
    { label: 'Contribution', href: '/contribution' },
    { label: 'A propos', href: '/about' }
  ];

  const displayLinks = links.map((link, index) => {
    return (
      <NextLink key={index} href={link.href}>
        <Link
          color={router.pathname === link.href ? 'primary' : ''}
          fontWeight={router.pathname === link.href ? 'bold' : 'inherit'}
          _hover={{ color: 'primary' }}
        >
          {link.label}
        </Link>
      </NextLink>
    );
  });

  const displayDrawer = () => {
    return <MobileDrawer displayLinks={displayLinks} />;
  };

  return (
    <Box width={'100%'} border={'1px solid #E9F1FF'} py={4}>
      <Container maxW="container.2lg">
        <Flex justifyContent={'space-between'} alignItems={'center'} w="full">
          <HStack>
            <Image src="/Mariane.png" alt="Marianne" w={24} mr={4} />
            <NextLink href="/">
              <Flex flexDir="column">
                <Flex cursor="pointer" userSelect="none">
                  <Heading fontSize="xl"> La fonction publique de</Heading>
                  <Heading
                    fontSize="xl"
                    bgGradient="linear(to-t, #97F8B1, #2F80ED)"
                    bgClip="text"
                    ml={1.5}
                  >
                    Normandie
                  </Heading>
                </Flex>
                <Flex cursor="pointer" userSelect="none">
                  <Text as="i" mt={1}>
                    La
                    <Text
                      display="inline"
                      as="b"
                      fontStyle="normal"
                      bgGradient="linear(to-t, #97F8B1, #2F80ED)"
                      bgClip="text"
                      ml={1.5}
                    >
                      PFRH
                    </Text>{' '}
                    à votre service
                  </Text>
                </Flex>
              </Flex>
            </NextLink>
          </HStack>
          <HStack justifyContent={'space-between'} gap={10}>
            {isLargerThan768 ? displayLinks : displayDrawer()}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
