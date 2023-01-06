import { Box, Heading, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCheckCircleFill, BsTrash } from "react-icons/bs";
import UITable from "../../../../components/ui/table";
import {
  ChangeAction,
  ColumnDef,
  DataResponse,
} from "../../../../components/ui/table/interfaces";
import { fetchApi } from "../../../../utils/api/fetch-api";
import useModals from "../../../../utils/hooks/useModals";
import { TContribution } from "../../../api/contributions/types";

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
          >
            {item.theme?.name}
          </Tag>
        );
      },
    },
    {
      key: "isAccepted",
      label: "Statut",
      renderItem: (item: TContribution) => {
        return item.isAccepted ? "Validé" : "En attente";
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
    {
      key: "validate",
      label: "Valider",
      icon: <BsCheckCircleFill />,
      action: (item: TContribution) => {
        item.isAccepted = !item.isAccepted;
        return fetchApi.put("/api/contributions/update", item);
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
