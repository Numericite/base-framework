import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { BsJournal, BsPencil, BsTrash } from "react-icons/bs";
import UITable from "../../../../components/ui/table";
import {
  ChangeAction,
  ColumnDef,
  DataResponse,
} from "../../../../components/ui/table/interfaces";
import { fetchApi } from "../../../../utils/api/fetch-api";

import useModals from "../../../../utils/hooks/useModals";
import {
  TRessource,
  TRessourceUpdateStatusPayload,
} from "../../../api/ressources/types";
import IconPlaceHolder from "../../../../components/ui/icon-placeholder";

const DashboardRessources = () => {
  const router = useRouter();
  const { confirm } = useModals();

  const columnDefs: ColumnDef<TRessource>[] = [
    {
      key: "name",
      label: "Nom",
    },
    {
      key: "kind",
      label: "Type",
      renderItem: (item: TRessource) => {
        return (
          <Flex align="center">
            <IconPlaceHolder kind={item.kind} />
          </Flex>
        );
      },
    },
    {
      key: "theme",
      label: "Thème",
      renderItem: (item: TRessource) => {
        return (
          <Tag
            minW="200px"
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
      key: "status",
      label: "Statut",
      renderItem: (item: TRessource) => {
        return (
          <Text
            fontSize="sm"
            color={item.status === "published" ? "green" : "orange"}
          >
            {item.status === "published" ? "Publiée" : "Brouillon"}
          </Text>
        );
      },
    },
    {
      key: "contribution",
      label: "Contribution",
      renderItem: (item: TRessource) => {
        return item.contribution ? (
          <Text fontSize="sm">Contribution externe</Text>
        ) : (
          <Text fontSize="sm">Ressource PFRH</Text>
        );
      },
    },
  ];

  const changeActions: ChangeAction<TRessource>[] = [
    {
      key: "status-publish",
      label: "Publier",
      hide: (item: TRessource) => item.status === "published",
      icon: <BsJournal />,
      action: (item: TRessource) => {
        return confirm("Publier la ressource " + item.name + " ?").then(
          (value) => {
            if (value) {
              const payload: TRessourceUpdateStatusPayload = {
                id: item.id,
                status: "published",
              };
              return fetchApi.put("/api/ressources/update-status", payload);
            }
          }
        );
      },
    },
    {
      key: "status-draft",
      label: "Dépublier",
      hide: (item: TRessource) => item.status === "draft",
      icon: <BsJournal />,
      action: (item: TRessource) => {
        return confirm("Dépublier la ressource " + item.name + " ?").then(
          (value) => {
            if (value) {
              const payload: TRessourceUpdateStatusPayload = {
                id: item.id,
                status: "draft",
              };
              return fetchApi.put("/api/ressources/update-status", payload);
            }
          }
        );
      },
    },
    {
      key: "update",
      label: "Modifier",
      icon: <BsPencil />,
      action: (item: TRessource) => {
        router.push("/dashboard/bo/ressources/" + item.id);
      },
    },
    {
      key: "delete",
      label: "Supprimer",
      icon: <BsTrash />,
      action: (item: TRessource) => {
        return confirm("Supprimer la ressource" + item.name + " ?").then(
          (value) => {
            if (value) {
              return fetchApi.delete("/api/ressources/delete", { id: item.id });
            }
          }
        );
      },
    },
  ];

  const retrieveData = (
    page: number,
    pageSize: number
  ): Promise<DataResponse<TRessource>> => {
    return fetchApi
      .get("/api/ressources/list", {
        pagination: {
          page,
          pageSize,
        },
        sort: {
          createdAt: "desc",
        },
      })
      .then((response) => {
        return {
          count: response.pagination.total,
          items: response.data,
        };
      });
  };

  return (
    <Box minW="full">
      <Heading size="lg" mb={5}>
        Gestion des ressources :{" "}
      </Heading>
      <UITable
        retrieveData={retrieveData}
        columnDefs={columnDefs}
        changeActions={changeActions}
        onNewItem={() => {
          router.push("/dashboard/bo/ressources/new");
        }}
      />
    </Box>
  );
};

export default DashboardRessources;
