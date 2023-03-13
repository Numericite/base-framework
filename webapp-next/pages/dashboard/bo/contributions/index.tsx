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
import {
  AiFillCheckCircle,
  AiFillCloseSquare,
  AiFillEye,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { Filter } from "../../../../components/ui/filters/interface";

const DashboardContributions = () => {
  const router = useRouter();
  const { confirm } = useModals();

  const displayStatusName = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return "En attente de validation";
      case "accepted":
        return "Acceptée";
      case "refused":
        return "Refusée";
      case "in_progress":
        return "En cours de révision";
      case "published":
        return "Publiée";
      default:
        break;
    }
  };

  const displayStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return <AiFillEye color="orange" size={20} />;
      case "accepted":
        return <AiFillCheckCircle color="green" size={20} />;
      case "refused":
        return <AiFillCloseSquare color="red" size={20} />;
      case "in_progress":
        return <AiOutlineFieldTime color="orange" size={20} />;
      case "published":
        return <AiFillCheckCircle color="green" size={20} />;
      default:
        break;
    }
  };

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
      key: "status",
      label: "Statut",
      renderItem: (item: TContribution) => {
        return (
          <Flex>
            {displayStatusIcon(item.status)}
            <Text ml={2} fontSize="sm">
              {displayStatusName(item.status)}
            </Text>
          </Flex>
        );
      },
    },
  ];

  const retrieveData = (
    page: number,
    pageSize: number,
    search: string,
    filters: Filter[]
  ): Promise<DataResponse<TContribution>> => {
    return fetchApi
      .get("/api/contributions/list", {
        pagination: {
          page,
          pageSize,
        },
        filters: {
          status: filters
            .filter((f) => f.label === "status")
            .map((f) => f.value),
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

  const filters = [
    {
      title: "Statut",
      slug: "status",
      items: [
        {
          label: "En attente de validation",
          value: "pending",
        },
        {
          label: "Acceptée",
          value: "accepted",
        },
        {
          label: "Refusée",
          value: "refused",
        },
        {
          label: "En cours de révision",
          value: "in_progress",
        },
        {
          label: "Publiée",
          value: "published",
        },
      ],
    },
  ];

  return (
    <Box minW="full">
      <Heading mb={5}>Gestion des contributions : </Heading>
      <UITable
        retrieveData={retrieveData}
        columnDefs={columnDefs}
        changeActions={changeActions}
        filters={filters}
      />
    </Box>
  );
};

export default DashboardContributions;
