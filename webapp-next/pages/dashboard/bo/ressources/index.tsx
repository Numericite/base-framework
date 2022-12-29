import { Box, Heading, Tag } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import { BsPencil, BsTrash } from "react-icons/bs";
import UITable from "../../../../components/ui/table";
import {
  ChangeAction,
  ColumnDef,
  DataResponse,
} from "../../../../components/ui/table/interfaces";
import { fetchApi } from "../../../../utils/api/fetch-api";
import { displayKindReadable } from "../../../../utils/globals/enums";
import useModals from "../../../../utils/hooks/useModals";
import { TRessource } from "../../../api/ressources/types";

const DashboardRessources = () => {
  const router = useRouter();
  const { confirm } = useModals();

  const colors = ["red", "orange", "yellow", "green", "teal", "blue"];

  const columnDefs: ColumnDef<TRessource>[] = [
    {
      key: "name",
      label: "Nom",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "kind",
      label: "Type",
      renderItem: (item: TRessource) => {
        return displayKindReadable(item.kind);
      },
    },
    {
      key: "theme",
      label: "Thème",
      renderItem: (item: TRessource) => {
        return (
          <Tag
            size="sm"
            w="full"
            fontSize={{ base: "xs", sm: "xs" }}
            variant="subtle"
            colorScheme={_.sample(colors)}
          >
            {item.theme?.name}
          </Tag>
        );
      },
    },
  ];

  const changeActions: ChangeAction<TRessource>[] = [
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
      <Heading mb={5}>Gestion des ressources : </Heading>
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
