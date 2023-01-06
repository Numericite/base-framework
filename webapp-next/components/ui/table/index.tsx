import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect, FormEvent } from "react";

import { TableProps } from "./interfaces";
import { ReactNode } from "react";
import { useDebounce } from "usehooks-ts";
import type { Filter } from "../filters/interface";
import Searchbar from "../searchbar";
import Filters from "../filters";
import DropdownButton from "../dropdown";
import { isPromise } from "../../../utils/globals/tools";
import ActionLink from "./action-link";

const UITable = <TItem,>(props: TableProps<TItem>) => {
  const { columnDefs, retrieveData, changeActions, onDelete, onUpdate } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<TItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [numberPerPage, setNumberPerPage] = useState<number>(25);
  const [count, setCount] = useState<number>(0);
  const [nbPages, setNbPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 500);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

  const getItems = () => {
    setIsLoading(true);
    retrieveData(page, numberPerPage, search, selectedFilters)
      .then((response) => {
        setCount(response.count);
        setItems(response.items);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (page && numberPerPage) getItems();
  }, [page, numberPerPage, debounceSearch, selectedFilters]);

  useEffect(() => {
    if (count && numberPerPage)
      setNbPages(
        count > numberPerPage ? Math.trunc(count / numberPerPage) + 1 : 1
      );
  }, [count, numberPerPage]);

  useEffect(() => {
    if (props.triggerRetrieve !== undefined) getItems();
  }, [props.triggerRetrieve]);

  const handleNumberPerPageChange = (value: string) => {
    setNumberPerPage(parseInt(value));
  };

  const getFilters = () => {
    if (props.filters) {
      return (
        <Filters
          filters={props.filters}
          setSelectedFilters={setSelectedFilters}
        />
      );
    }
    return <></>;
  };

  return (
    <Box w="full">
      <Box display="flex" mb={6}>
        {props.onNewItem && !props.hideNewItem && (
          <Button
            variant="primary"
            size="xs"
            borderRadius="3xl"
            onClick={props.onNewItem}
            p={4}
            mr={2}
          >
            <AddIcon mr={2} fontSize="xs" />{" "}
            {props.newItemLabel ? props.newItemLabel : "Ajouter"}
          </Button>
        )}
        {props.displaySearchbar && (
          <Searchbar
            size="sm"
            placeholder="Rechercher"
            onSearch={(e: FormEvent<HTMLInputElement>) => {
              setSearch(e.currentTarget.value);
            }}
          />
        )}
        {!props.lightMode && (
          <Box ml="auto" mr="2">
            <DropdownButton
              onChange={handleNumberPerPageChange}
              value={numberPerPage.toString()}
              options={[
                { label: "1 ligne", value: "1" },
                { label: "5 lignes", value: "5" },
                { label: "10 lignes", value: "10" },
                { label: "25 lignes", value: "25" },
                { label: "50 lignes", value: "50" },
                { label: "100 lignes", value: "100" },
              ]}
              isOutline
              size="md"
            >
              Affichage : {numberPerPage} lignes <ChevronDownIcon ml={1} />
            </DropdownButton>
          </Box>
        )}
        {getFilters()}
      </Box>
      <Box
        borderRadius="3xl"
        display="flex"
        shadow={!props.noBorder ? "md" : "none"}
        maxW="full"
        bg="white"
      >
        <Table maxW={"full"}>
          <Thead>
            <Tr maxW={"full"}>
              {columnDefs
                .filter((_) => !_.hide)
                .map((columnDef, i) => (
                  <Th
                    w={columnDef.size ? columnDef.size : "auto"}
                    fontSize="md"
                    textTransform="none"
                    fontWeight="normal"
                    pt={8}
                    pb={6}
                    color="#858C94"
                    key={i}
                  >
                    {columnDef.label}
                  </Th>
                ))}
              {columnDefs.filter((_) => !_.hide).length > 0 && <Th></Th>}
            </Tr>
          </Thead>
          <Tbody position="relative">
            {isLoading && (
              <Tr>
                <Td
                  colSpan={columnDefs.filter((_) => !_.hide).length + 1}
                  textAlign="center"
                >
                  <Spinner my={10} mx="auto" color="secondary" size="lg" />
                </Td>
              </Tr>
            )}
            {!isLoading && items.length === 0 && (
              <Tr>
                <Td
                  colSpan={columnDefs.filter((_) => !_.hide).length + 1}
                  textAlign="center"
                >
                  <Text my={10}>Aucun élément à afficher...</Text>
                </Td>
              </Tr>
            )}
            {!isLoading &&
              items.map((item, index) => (
                <Tr
                  key={index}
                  maxW={"full"}
                  borderBottom={
                    index === items.length - 1 ? "hidden" : "inherit"
                  }
                >
                  {columnDefs
                    .filter((_) => !_.hide)
                    .map((columnDef, i) => {
                      const clickChangeAction = changeActions.find(
                        (action) => action.key === columnDef.clickActionKey
                      );
                      return (
                        <Td width={"fit-content"} key={i}>
                          <ActionLink
                            action={clickChangeAction?.action}
                            params={[item]}
                          >
                            {columnDef.prefix}
                            {columnDef.renderItem
                              ? columnDef.renderItem(item)
                              : (item[
                                  columnDef.key as keyof TItem
                                ] as unknown as ReactNode)}
                            {columnDef.suffix}
                          </ActionLink>
                        </Td>
                      );
                    })}
                  {changeActions.length > 0 && (
                    <Td w={"1"}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="right"
                        alignItems="center"
                      >
                        {changeActions
                          .filter((_) => !_.hide || !_.hide(item))
                          .map((changeAction) => (
                            <Button
                              size="xs"
                              variant="neutral"
                              mr={1}
                              key={changeAction.key}
                              onClick={() => {
                                const response = changeAction.action(item);
                                if (isPromise(response))
                                  (response as Promise<any>).finally(() => {
                                    getItems();
                                  });
                              }}
                            >
                              <Box pr={changeAction.label !== "" ? 2 : 0}>
                                {changeAction.icon}
                              </Box>
                              <Text>{changeAction.label}</Text>
                            </Button>
                          ))}
                      </Box>
                    </Td>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      {nbPages > 1 && (
        <Box display="flex">
          <Box display="flex" mx="auto" mt={8}>
            {new Array(nbPages).fill(0).map((p, index) => (
              <Box
                w={12}
                key={index}
                onClick={() => {
                  setPage(index + 1);
                }}
              >
                <Text
                  as={page === index + 1 ? "b" : undefined}
                  bg={page === index + 1 ? "primary" : "infoLight"}
                  py={3}
                  textAlign="center"
                  color={page === index + 1 ? "white" : "black"}
                  borderRadius="lg"
                  display="block"
                  w="full"
                  cursor="pointer"
                  ml={index !== 0 ? 3.5 : 0}
                >
                  {index + 1}
                </Text>
              </Box>
            ))}
            {!isLoading && page !== nbPages && (
              <Box
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <Text
                  bg={"neutralDark"}
                  py={3}
                  textAlign="center"
                  color={"white"}
                  borderRadius="lg"
                  px={4}
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  ml={3.5}
                >
                  Suivant <ArrowForwardIcon ml={2} />
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UITable;
