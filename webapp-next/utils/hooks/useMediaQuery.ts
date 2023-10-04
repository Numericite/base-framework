import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const useMediaQueryAdapter = (mediaQuery: string): boolean | null => {
  const tmpIsLargeThan768 = useMediaQuery(mediaQuery);
  const [isLargerThan768, setIsLargerThan768] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLargerThan768(tmpIsLargeThan768);
  }, [tmpIsLargeThan768]);

  return isLargerThan768;
};
