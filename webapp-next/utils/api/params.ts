export const getUsableParams = (params: {
  [key: string]: string | string[] | undefined;
}): {
  [key: string]: string | string[];
} => {
  let usableParams: {
    [key: string]: string | string[];
  } = {};

  for (const [key, value] of Object.entries(params)) {
    try {
      const parsed = JSON.parse(value as string);
      if (typeof parsed === "object") {
        usableParams[key] = parsed;
      } else if (value) {
        usableParams[key] = value;
      }
    } catch {
      if (value) {
        usableParams[key] = value;
      }
    }
  }

  return usableParams;
};
