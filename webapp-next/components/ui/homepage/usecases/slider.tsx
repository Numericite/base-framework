import { Box, Divider, Radio, RadioGroup } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface IUseCaseSliderProps {
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

const UseCaseSlider: React.FC<IUseCaseSliderProps> = (props) => {
  const { tabIndex, setTabIndex } = props;
  return (
    <Box minH="full" position={"relative"}>
      <RadioGroup
        variant="gradient"
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
        my={"auto"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        zIndex={1}
        value={tabIndex.toString()}
        onChange={(e) => setTabIndex(parseInt(e))}
        gap={"1.5rem"}
      >
        <Radio value="0" />
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>
      <Divider
        zIndex={-1}
        orientation="vertical"
        variant="solid"
        minH="100%"
        w="2px"
        bgColor="#E9F1FF"
      />
    </Box>
  );
};

export default UseCaseSlider;
