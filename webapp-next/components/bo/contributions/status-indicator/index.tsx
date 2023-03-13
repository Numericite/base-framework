import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCross, FaTimes } from "react-icons/fa";
import { TContribution } from "../../../../pages/api/contributions/types";
import {
  TRessource,
  TRessourceCreationPayload,
} from "../../../../pages/api/ressources/types";
import { fetchApi } from "../../../../utils/api/fetch-api";
import useModals from "../../../../utils/hooks/useModals";

interface IStatusIndicatorProps {
  status: string;
  setStatus: (status: string) => void;
  contribution: TContribution;
}

const StatusIndicator = (props: IStatusIndicatorProps) => {
  const { contribution, status, setStatus } = props;
  const router = useRouter();

  const [statusList, setStatusList] = useState<
    { label: string; content: JSX.Element }[]
  >([]);

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: statusList.findIndex((el) => el.label === status),
  });

  const { confirm } = useModals();

  const handleValidation = async () => {
    let ressource: TRessourceCreationPayload = {
      name: "",
      description: contribution.description,
      theme: contribution.theme!,
      content: "",
      personaes: [],
      personae_occupations: [],
      sub_themes: [],
      status: "draft",
      kind: "link",
      link: "",
      contribution: contribution.id,
    };
    if (contribution.link) {
      ressource = {
        ...ressource,
        link: contribution.link,
        kind: "link",
      };
    } else {
      ressource = {
        ...ressource,
        kind: "file",
        files: contribution.files as File | undefined,
      };
    }
    try {
      const res = await fetchApi.post("/api/ressources/create", {
        ...ressource,
      });
      router.push({
        pathname: `/dashboard/bo/ressources/${res.id}`,
        query: { contribution_id: contribution.id },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (status === "pending") {
      setStep(0);
      setStatusList([
        { label: "En attente", content: <Text>En attente</Text> },
      ]);
    } else if (status === "refused") {
      setStep(2);
      setStatusList([
        { label: "En attente", content: <Text>En attente</Text> },
        {
          label: "Refusée",
          content: <Text>Refusée</Text>,
        },
      ]);
    } else if (status === "accepted") {
      setStep(2);
      setStatusList([
        { label: "En attente", content: <Text>En attente</Text> },
        {
          label: "Acceptée",
          content: <Text>Acceptée</Text>,
        },
        {
          label: "En révision",
          content: <Text>En cours</Text>,
        },

        {
          label: "Publiée",
          content: <Text>Publiée</Text>,
        },
      ]);
    } else if (status === "in_progress") {
      setStep(3);
      setStatusList([
        { label: "En attente", content: <Text>En attente</Text> },
        {
          label: "Acceptée",
          content: <Text>Acceptée</Text>,
        },
        {
          label: "En révision",
          content: <Text>En cours</Text>,
        },

        {
          label: "Publiée",
          content: <Text>Publiée</Text>,
        },
      ]);
    } else if (status === "published") {
      setStep(4);
      setStatusList([
        { label: "En attente", content: <Text>En attente</Text> },
        {
          label: "Acceptée",
          content: <Text>Acceptée</Text>,
        },
        {
          label: "En révision",
          content: <Text>En cours</Text>,
        },

        {
          label: "Publiée",
          content: <Text>Publiée</Text>,
        },
      ]);
    }
  }, [status]);

  const displayStatusElement = () => {
    return statusList.map((el, index) => {
      if (el.label === "Refusée") {
        return (
          <Step
            label={el.label}
            key={el.label}
            state={"error"}
            checkIcon={() => <FaTimes color="white" size={20} />}
          ></Step>
        );
      } else {
        return <Step label={el.label} key={el.label}></Step>;
      }
    });
  };

  return (
    <>
      <Flex my={3}>
        <Steps
          justifyContent={"flex-start"}
          colorScheme={"green"}
          activeStep={activeStep}
        >
          {displayStatusElement()}
        </Steps>
        {status === "pending" && (
          <Flex gap={5}>
            <Button onClick={() => setStatus("accepted")}>Accepter</Button>
            <Button onClick={() => setStatus("refused")} variant="solid">
              Refuser
            </Button>
          </Flex>
        )}
      </Flex>
      {status === "accepted" && (
        <Button my={5} onClick={() => setStatus("in_progress")}>
          Valider la révision par l&apos;équipe
        </Button>
      )}
      {status === "refused" && (
        <Button
          my={5}
          onClick={() =>
            confirm(
              "Êtes vous sur de vouloir réouvrir cette contribution ?"
            ).then((res) => {
              if (res) {
                setStatus("pending");
              }
            })
          }
        >
          Réouvrir la contribution
        </Button>
      )}
      {status === "in_progress" && (
        <Button
          my={5}
          onClick={() =>
            confirm(
              "Êtes-vous sûr de vouloir publier cette contribution ?"
            ).then((res) => {
              if (res) {
                handleValidation();
              }
            })
          }
        >
          Publier la contribution
        </Button>
      )}
    </>
  );
};

export default StatusIndicator;
