import {
  Box,
  Heading,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { TRessource } from "../../../../pages/api/ressources/types";
import { useMediaQueryAdapter } from "../../../../utils/hooks/useMediaQuery";
import RessourceInfos from "../ressource-info";

interface RessourceMenuProps {
  titles:
    | {
        title: string | null;
        subtitles: (string | null)[] | null;
      }[]
    | null;
  ressource: TRessource;
  isUseCase?: boolean;
}

const RessourceMenu = (props: RessourceMenuProps) => {
  const { titles, ressource, isUseCase } = props;
  const isLargerThan768 = useMediaQueryAdapter("(min-width: 768px)");

  const menuItems = titles?.map((el) => (
    <ListItem color="neutralBlue" fontWeight={"400"} key={el.title}>
      <Link href={`#${el.title}`}>{el.title}</Link>
      {el.subtitles && el.subtitles.length > 0 && (
        <UnorderedList>
          {el.subtitles.map((sub, index) => {
            return (
              <ListItem
                listStyleType={"none"}
                key={index}
                color="neutralBlue"
                fontWeight={"400"}
              >
                <Link href={`#${sub}`}>{sub}</Link>
              </ListItem>
            );
          })}
        </UnorderedList>
      )}
    </ListItem>
  ));

  return (
    <Box
      position={["relative", "sticky"]}
      zIndex={-1}
      top={isUseCase ? [0, 100] : [0, 30]}
    >
      <Box
        borderRadius={"2xl"}
        p="0.9px"
        bgGradient="linear(to-b,  #97F8B1 0%, #2F6CFF 100%)"
        w="full"
        mb="2.125rem"
      >
        <Box
          bg="#FAFCFF"
          borderRadius={"2xl"}
          py="1.5rem"
          px="1.875rem"
          alignItems="start"
          w="full"
          minH="full"
        >
          <Heading size="sm" mb={"0.875rem"}>
            Sommaire
          </Heading>
          <OrderedList spacing={4}>{menuItems}</OrderedList>
        </Box>
      </Box>
      {isLargerThan768 && <RessourceInfos ressource={ressource} />}
    </Box>
  );
};

export default RessourceMenu;
