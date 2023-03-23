import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import _ from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { TRessource } from "../../../../pages/api/ressources/types";
import { fetchApi } from "../../../../utils/api/fetch-api";

interface RessourceModalProps {
  ressources: TRessource[];
  isOpen: boolean;
  onClose: () => void;
  setRessources: Dispatch<SetStateAction<TRessource[]>>;
}

const RessourceModal = (props: RessourceModalProps) => {
  const { isOpen, onClose, setRessources, ressources } = props;
  const [results, setResults] = useState<TRessource[]>([]);
  const [selectedRessource, setSelectedRessource] = useState<TRessource>();
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      fetchRessources(search);
    }
  }, [debouncedSearch]);

  const fetchRessources = (search: string) => {
    setIsApiLoading(true);
    fetchApi
      .get("/api/ressources/list", {
        pagination: {
          page: 1,
          pageSize: 10,
        },
        filters: {
          name: {
            $containsi: search,
          },
        },
      })
      .then((res) => setResults(res.data))
      .finally(() => {
        setIsApiLoading(false);
      });
  };

  const handleAddRessource = () => {
    if (selectedRessource) {
      setRessources(_.uniqBy([...ressources, selectedRessource], "id"));
      setSelectedRessource(undefined);
      onClose();
    } else {
      setIsVisible(true);
    }
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recherchez la ressource à ajouter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isVisible ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>
                Veuillez sélectionner une ressource
              </AlertTitle>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                onClick={() => {
                  setIsVisible(false);
                }}
              />
            </Alert>
          ) : (
            <AutoComplete
              suggestWhenEmpty={false}
              listAllValuesOnFocus={false}
              disableFilter
              emptyState={
                <Text align="center" p={1}>
                  Aucun Résultat
                </Text>
              }
            >
              <AutoCompleteInput
                placeholder="Recherchez une ressource"
                size="sm"
                w="full"
                onChange={handleChange}
              />
              {isApiLoading ? (
                <Flex
                  w="full"
                  h="full"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Spinner />
                </Flex>
              ) : (
                <AutoCompleteList>
                  {(results || []).map((ressource) => {
                    return (
                      <AutoCompleteItem
                        key={ressource.id}
                        value={ressource.name}
                        onClick={() => {
                          setSelectedRessource(ressource);
                        }}
                      />
                    );
                  })}
                </AutoCompleteList>
              )}
            </AutoComplete>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleAddRessource()}
          >
            Ajouter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RessourceModal;
