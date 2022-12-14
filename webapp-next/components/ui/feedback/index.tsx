import { Button, Flex, Heading, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { TFeedback } from "../../../pages/api/feedbacks/types";
import { fetchApi } from "../../../utils/api/fetch-api";

interface FeedBackProps {
  id: number;
}

const Feedback: React.FC<FeedBackProps> = (props) => {
  const [displayComment, setDisplayComment] = useState<boolean>(false);
  const [yesButtonCliked, setYesButtonCliked] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<TFeedback>({
    appreciation: 0,
    description: "",
    ressource: { id: props.id },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendPositiveFeedback = () => {
    setDisplayComment(false);
    setYesButtonCliked(true);
    handleSubmit(1);
  };

  const handleShowMore = (appreciation: number) => {
    setDisplayComment(true);
    setFeedback({ ...feedback, appreciation });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback({ ...feedback, description: e.target.value });
  };

  const handleSubmit = (value?: number) => {
    setLoading(true);
    if (value) {
      let tmpFeedback = {
        ...feedback,
        appreciation: value,
        ressource: { id: props.id },
      };
      fetchApi.post("/api/feedbacks/create", tmpFeedback);
    } else {
      let tmpFeedback = { ...feedback, ressource: { id: props.id } };
      fetchApi.post("/api/feedbacks/create", tmpFeedback);
    }
  };

  return (
    <Flex
      flexDir={"column"}
      w="full"
      border="1px solid #E9F1FF"
      alignItems={"center"}
      mx="auto"
      justifyContent={"center"}
      py={"2.125rem"}
    >
      <Heading fontSize="1.5xl">
        Est ce que cette page vous a été utile ?
      </Heading>
      <Flex mt={"2.125rem"} justifyContent="space-between">
        <Button
          onClick={handleSendPositiveFeedback}
          mr={"0.875rem"}
          isActive={yesButtonCliked}
          isDisabled={yesButtonCliked || loading}
        >
          Oui
        </Button>
        <Button
          variant="neutral"
          onClick={() => handleShowMore(0)}
          isDisabled={yesButtonCliked || loading}
        >
          Non
        </Button>
      </Flex>
      {displayComment && (
        <Flex
          w="50%"
          flexDir={"column"}
          justifyItems="center"
          alignItems={"center"}
        >
          <Textarea
            mt={"0.875rem"}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Pouvez vous donner plus de précisions ?"
          />
          <Button
            mt={"0.875rem"}
            isDisabled={loading}
            onClick={() => handleSubmit()}
          >
            Envoyer
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Feedback;
