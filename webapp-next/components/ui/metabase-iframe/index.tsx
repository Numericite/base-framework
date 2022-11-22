import { Box } from "@chakra-ui/react";
import { createRef, RefObject, useCallback, useEffect, useState } from "react";

type MetabaseIframeProps = {
  url: string;
  height: number;
  width?: string | number;
};

const MetabaseIframe = ({
  url,
  height = 500,
  width = "100%",
}: MetabaseIframeProps) => {
  return (
    <Box rounded="lg" overflow="hidden" height={`${height - 90}px`}>
      <iframe
        src={url}
        style={{
          height: height,
        }}
        width={width}
      />
    </Box>
  );
};

export default MetabaseIframe;
