import { Box, Flex, Heading, Modal, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCheckCircleFill, BsEyeFill, BsTrash } from "react-icons/bs";
import UITable from "../../../../components/ui/table";
import {
  ChangeAction,
  ColumnDef,
  DataResponse,
} from "../../../../components/ui/table/interfaces";
import { fetchApi } from "../../../../utils/api/fetch-api";
import useModals from "../../../../utils/hooks/useModals";
import { TContribution } from "../../../api/contributions/types";
import { AiFillCheckCircle, AiFillCloseSquare } from "react-icons/ai";

const DashboardContributions = () => {
  const router = useRouter();
  const { confirm } = useModals();

  const columnDefs: ColumnDef<TContribution>[] = [
    {
      key: "first_name",
      label: "Nom",
    },
    {
      key: "last_name",
      label: "Prénom",
    },
    {
      key: "job_title",
      label: "Fonction",
    },
    {
      key: "theme",
      label: "Thème",
      renderItem: (item: TContribution) => {
        return (
          <Tag
            size="sm"
            w="full"
            fontSize={{ base: "xs", sm: "xs" }}
            variant="subtle"
            colorScheme={item.theme?.color || "gray"}
          >
            {item.theme?.name}
          </Tag>
        );
      },
    },
    {
      key: "commentary",
      label: "Contenu",
      renderItem: (item: TContribution) => {
        return (
          <Flex align={"center"} justify="space-between">
            <Text fontSize="sm">{item.commentary}</Text>
          </Flex>
        );
      },
    },
    {
      key: "isAccepted",
      label: "Statut",
      renderItem: (item: TContribution) => {
        return item.isAccepted ? (
          <Flex>
            <AiFillCheckCircle color="green" />
            <Text ml={2} fontSize="sm">
              Validée
            </Text>
          </Flex>
        ) : (
          <Flex align={"center"} justify="space-between">
            <AiFillCloseSquare color="red" />
            <Text ml={2} fontSize="sm">
              En attente
            </Text>
          </Flex>
        );
      },
    },
  ];

  const retrieveData = (
    page: number,
    pageSize: number
  ): Promise<DataResponse<TContribution>> => {
    return fetchApi
      .get("/api/contributions/list", {
        pagination: {
          page,
          pageSize,
        },
      })
      .then((response) => {
        return {
          count: response.pagination.total,
          items: response.data,
        };
      });
  };
  const changeActions: ChangeAction<TContribution>[] = [
    {
      key: "view",
      label: "Voir",
      icon: <BsEyeFill />,
      action: (item: TContribution) => {
        router.push("/dashboard/bo/contributions/" + item.id);
      },
    },
    {
      key: "validate",
      label: "Valider",
      icon: <BsCheckCircleFill />,
      action: (item: TContribution) => {
        return confirm(
          "Valider la contribution de " +
            item.first_name +
            " " +
            item.last_name +
            " ?"
        ).then(() => {
          item.isAccepted = !item.isAccepted;
          return fetchApi.put("/api/contributions/update", item);
        });
      },
    },
    {
      key: "delete",
      label: "Supprimer",
      icon: <BsTrash />,
      action: (item: TContribution) => {
        return confirm(
          "Supprimer la contribution de" +
            item.first_name +
            item.last_name +
            " ?"
        ).then((value) => {
          if (value) {
            return fetchApi.delete("/api/contributions/delete", {
              id: item.id as number,
            });
          }
        });
      },
    },
  ];

  return (
    <Box minW="full">
      <Heading mb={5}>Gestion des contributions : </Heading>
      <UITable
        retrieveData={retrieveData}
        columnDefs={columnDefs}
        changeActions={changeActions}
      />
    </Box>
  );
};

export default DashboardContributions;
