import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  ChangeAction,
  ColumnDef,
  DataResponse,
} from "../../../../components/ui/table/interfaces";
import { TUseCase } from "../../../api/usecases/types";
import { fetchApi } from "../../../../utils/api/fetch-api";
import { useRouter } from "next/router";
import useModals from "../../../../utils/hooks/useModals";
import { BsPencil, BsTrash } from "react-icons/bs";
import UITable from "../../../../components/ui/table";

const DashboardUseCases = () => {
  const router = useRouter();
  const { confirm } = useModals();

  const columnDefs: ColumnDef<TUseCase>[] = [
    {
      key: "name",
      label: "Nom",
    },
    {
      key: "description",
      label: "Description",
    },
  ];

  const changeActions: ChangeAction<TUseCase>[] = [
    {
      key: "update",
      label: "Modifier",
      icon: <BsPencil />,
      action: (item: TUseCase) => {
        router.push("/dashboard/bo/usecases/" + item.id);
      },
    },
    {
      key: "delete",
      label: "Supprimer",
      icon: <BsTrash />,
      action: (item: TUseCase) => {
        return confirm("Supprimer la ressource" + item.name + " ?").then(
          (value) => {
            if (value) {
              return fetchApi.delete("/api/usecases/delete", {
                id: item.id,
              });
            }
          }
        );
      },
    },
  ];

  const retrieveData = (
    page: number,
    pageSize: number
  ): Promise<DataResponse<TUseCase>> => {
    return fetchApi
      .get("/api/usecases/list", {
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
      <UITable
        retrieveData={retrieveData}
        columnDefs={columnDefs}
        changeActions={changeActions}
        onNewItem={() => {
          router.push("/dashboard/bo/usecases/new");
        }}
      />
    </Box>
  );
};

export default DashboardUseCases;
