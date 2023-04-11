import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  OrderedList,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import RessourceHeader from '../../components/ui/ressources/header';
import { TRessource } from '../api/ressources/types';
import { fetchApi } from '../../utils/api/fetch-api';
import RessourceMenu from '../../components/ui/ressources/ressource-menu';
import Feedback from '../../components/ui/feedback';
import RessourceSimilar from '../../components/ui/ressources/ressource-similar';
import { useMediaQueryAdapter } from '../../utils/hooks/useMediaQuery';
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact
} from 'html-react-parser';
import type { Text as THTML } from 'html-react-parser';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getYoutubeIdFromFullUrl } from '../../utils/globals/tools';
import RessourceInfos from '../../components/ui/ressources/ressource-info';

interface Props {
  ressource: TRessource;
  similarRessources: TRessource[];
}

const RessourcePage: React.FC<Props> = ({ ressource, similarRessources }) => {
  const isLargerThan768 = useMediaQueryAdapter('(min-width: 768px)');

  const [titles, setTitles] = useState<
    {
      title: string | null;
      subtitles: (string | null)[] | null;
    }[]
  >([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(ressource.content, 'text/html');

    const h1Elements = Array.from(doc.querySelectorAll('h1'));
    for (let i = 0; i < h1Elements.length; i++) {
      const title = h1Elements[i].textContent;
      const subtitles: (string | null)[] = [];
      let nextElement = h1Elements[i].nextSibling;
      while (nextElement && nextElement.nodeName !== 'H1') {
        if (nextElement.nodeName === 'H2') {
          subtitles.push(nextElement.textContent);
        }
        nextElement = nextElement.nextSibling;
      }
      setTitles(prev => [
        ...prev,
        {
          title,
          subtitles
        }
      ]);
    }
    return () => setTitles([]);
  }, []);

  console.log(ressource.content);

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element && domNode.name === 'h1') {
        return (
          <Heading
            id={(domNode.children[0] as THTML).data?.trim()}
            size="md"
            my="1.125rem"
          >
            {domToReact(domNode.children)}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === 'h2') {
        return (
          <Heading
            id={(domNode.children[0] as THTML).data?.trim()}
            size="sm"
            my="0.765rem"
          >
            {domToReact(domNode.children)}
          </Heading>
        );
      }
      if (domNode instanceof Element && domNode.name === 'p') {
        return <Text color="neutralDark">{domToReact(domNode.children)}</Text>;
      }
      if (domNode instanceof Element && domNode.name === 'img') {
        return (
          <Image
            borderRadius="xl"
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
          />
        );
      }
      if (domNode instanceof Element && domNode.name === 'ul') {
        return (
          <UnorderedList pl={4}>
            {domNode.children.map((child, index) => {
              if (child instanceof Element && child.name === 'li') {
                return (
                  <ListItem color="neutralDark" key={index}>
                    {domToReact(child.children)}
                  </ListItem>
                );
              }
            })}
          </UnorderedList>
        );
      }
      if (domNode instanceof Element && domNode.name === 'ol') {
        return (
          <OrderedList pl={4}>
            {domNode.children.map((child, index) => {
              if (child instanceof Element && child.name === 'li') {
                return (
                  <ListItem color="neutralDark" key={index}>
                    {domToReact(child.children)}
                  </ListItem>
                );
              }
            })}
          </OrderedList>
        );
      }
    }
  };

  const displayFilesPreview = (files: { id: number; url: string }) => {
    const fileExtension = files.url.split('.').pop() || '';
    const fileUrl = files.url;
    if (fileExtension === 'pdf') {
      return (
        <Box>
          <iframe
            src={fileUrl}
            width="100%"
            height="1000px"
            frameBorder="0"
          ></iframe>
        </Box>
      );
    }
    if (
      fileExtension === 'png' ||
      fileExtension === 'jpg' ||
      fileExtension === 'jpeg'
    ) {
      return (
        <Box>
          <Image src={fileUrl} alt="" />
        </Box>
      );
    }
  };

  const ressourceBody = (
    <Box>
      {ressource.kind === 'video' && ressource.source === 'youtube' && (
        <Box mb={8}>
          <iframe
            width="100%"
            height="450px"
            src={`https://www.youtube.com/embed/${getYoutubeIdFromFullUrl(
              ressource.link
            )}?modestbranding=1&autohide=1&showinfo=0&controls=0`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      )}
      {!ressource.content &&
        ressource.kind === 'file' &&
        ressource.files &&
        displayFilesPreview(ressource.files)}
      {parse(ressource.content, options)}
    </Box>
  );

  return (
    <Box w="full">
      <RessourceHeader
        title={ressource.name}
        description={ressource.description}
        kind={ressource.kind}
      />
      <Container maxW="container.2lg" my="2.125rem">
        {/* {ressource.content ? ( */}
        <Flex justifyItems={'space-between'}>
          {isLargerThan768 && (
            <Box w="100%" pr={'1.5rem'}>
              {ressourceBody}
            </Box>
          )}
          <Box flexDir={'column'} minW="auto">
            <RessourceMenu
              ressource={ressource}
              titles={_.uniq(
                titles.map(el => {
                  return {
                    title: el.title,
                    subtitles: el.subtitles
                  };
                })
              )}
            />
            {!isLargerThan768 && (
              <Box w="100%" px={'1.5rem'}>
                {!ressource.content && <RessourceInfos ressource={ressource} />}
                {ressource.content && ressourceBody}
                {ressource.contribution &&
                  ressource.contribution?.first_name !== '' && (
                    <Box mt={8}>
                      <Text>
                        Merci à {ressource.contribution?.first_name}{' '}
                        {ressource.contribution?.last_name} pour cette ressource
                      </Text>
                    </Box>
                  )}
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
      <Feedback id={ressource.id} />
      <RessourceSimilar similarRessources={similarRessources} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const res = await fetchApi
    .get('/api/ressources/find', { id: parseInt(id as string) })
    .then(response => {
      return response;
    });

  const theme = res.theme;
  const similarRes = await fetchApi
    .get('/api/ressources/list', {
      pagination: { page: 1, pageSize: 12 },
      filters: { theme: theme.id }
    })
    .then(response => {
      return response.data;
    });

  return {
    props: {
      ressource: res,
      similarRessources: similarRes
    }
  };
};

export default RessourcePage;
