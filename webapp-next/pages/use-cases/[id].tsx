import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import UseCaseRessourceDisplay from "../../components/ui/use-cases/ressources-displayer";
import UseCaseHeader from "../../components/ui/use-cases/use-case-header";
import { fetchApi } from "../../utils/api/fetch-api";
import { getYoutubeIdFromFullUrl } from "../../utils/globals/tools";
import { TRessource } from "../api/ressources/types";
import { TUseCase } from "../api/usecases/types";
import type { Text as THTML } from "html-react-parser";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import RessourceMenu from "../../components/ui/ressources/ressource-menu";
import { useMediaQueryAdapter } from "../../utils/hooks/useMediaQuery";
import _ from "lodash";

interface Props {
  id: string;
  useCase: TUseCase;
}

const UseCasePage = (props: Props) => {
  const { useCase } = props;
  const isLargerThan768 = useMediaQueryAdapter("(min-width: 768px)");

  const [currentRessource, setCurrentRessource] = useState<TRessource>(
    useCase.steps[0]?.ressource
  );
  const [currentPosition, setCurrentPosition] = useState<number>(
    useCase.steps[0]?.position
  );

  const [titles, setTitles] = useState<
    {
      title: string | null;
      subtitles: (string | null)[] | null;
    }[]
  >([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(currentRessource.content, "text/html");

    const h1Elements = Array.from(doc.querySelectorAll("h1"));
    for (let i = 0; i < h1Elements.length; i++) {
      const title = h1Elements[i].textContent;
      const subtitles: (string | null)[] = [];
      let nextElement = h1Elements[i].nextSibling;
      while (nextElement && nextElement.nodeName !== "H1") {
        if (nextElement.nodeName === "H2") {
          subtitles.push(nextElement.textContent);
        }
        nextElement = nextElement.nextSibling;
      }
      setTitles((prev) => [
        ...prev,
        {
          title,
          subtitles,
        },
      ]);
    }
    return () => setTitles([]);
  }, [currentRessource]);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "h1") {
        return (
          <Heading
            id={(domNode.children[0] as THTML).data.trim()}
            size="lg"
            my="1.125rem"
          >
            {(domNode.children[0] as THTML).data}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === "h2") {
        return (
          <Heading
            id={(domNode.children[0] as THTML).data.trim()}
            size="md"
            my="0.765rem"
          >
            {(domNode.children[0] as THTML).data}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === "p") {
        return (
          <Text color="neutralDark">
            {(domNode.children[0] as THTML)?.data}
          </Text>
        );
      }
      if (domNode instanceof Element && domNode.name === "img") {
        return (
          <Image
            borderRadius="xl"
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
          />
        );
      }
    },
  };

  const ressourceBody = (
    <Box>
      {currentRessource.kind === "video" &&
        currentRessource.source === "youtube" && (
          <Box mb={8}>
            <iframe
              width="100%"
              height="450px"
              src={`https://www.youtube.com/embed/${getYoutubeIdFromFullUrl(
                currentRessource.link
              )}?modestbranding=1&autohide=1&showinfo=0&controls=0`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </Box>
        )}
      {parse(currentRessource.content, options)}
    </Box>
  );

  return (
    <Box w="full">
      <UseCaseHeader useCase={useCase} />
      {isLargerThan768 && (
        <UseCaseRessourceDisplay
          steps={useCase.steps}
          currentRessource={currentRessource}
          setCurrentPosition={setCurrentPosition}
          setCurrentRessource={setCurrentRessource}
        />
      )}
      <Container maxW="container.2lg" my="2.125rem">
        <Flex justifyItems={"space-between"}>
          {isLargerThan768 && (
            <Box w="100%" pr={"1.5rem"}>
              {ressourceBody}
            </Box>
          )}
          <Box flexDir={"column"} minW="auto">
            <RessourceMenu
              ressource={currentRessource}
              titles={_.uniq(
                titles.map((el) => {
                  return {
                    title: el.title,
                    subtitles: el.subtitles,
                  };
                })
              )}
              isUseCase={true}
            />
            {!isLargerThan768 && (
              <>
                <Box w="100%" px={"1.5rem"}>
                  {ressourceBody}
                </Box>
                <Flex
                  w="full"
                  justifyContent={"space-around"}
                  position={"sticky"}
                  bottom={10}
                  my={5}
                >
                  <Button
                    onClick={() => {
                      setCurrentPosition(currentPosition - 1);
                      setCurrentRessource(
                        useCase.steps[currentPosition - 1].ressource
                      );
                    }}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentPosition(currentPosition + 1);
                      setCurrentRessource(
                        useCase.steps[currentPosition + 1].ressource
                      );
                    }}
                  >
                    Suivant
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default UseCasePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetchApi
    .get("/api/usecases/find", { id: parseInt(id as string) })
    .then((response) => {
      return response;
    });

  return {
    props: {
      useCase: res,
    },
  };
};
