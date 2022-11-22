export const getRecursiveStrapiObject = (object: any): any => {
  let response: any = {};

  for (const [key, value] of Object.entries(object)) {
    if (key === "attributes") {
      for (const [key1, value1] of Object.entries(object[key])) {
        if (
          object[key][key1] !== undefined &&
          object[key][key1] !== null &&
          object[key][key1]["data"]
        ) {
          response[key1] = getRecursiveStrapiObject(object[key][key1]["data"]);
        } else if (
          object[key][key1] !== undefined &&
          object[key][key1] !== null &&
          object[key][key1]["data"] !== null
        ) {
          if (isNaN(key1 as any)) response[key1] = value1;
          else
            response = [
              ...(response[0] ? response : []),
              getRecursiveStrapiObject(value1),
            ];
        }
      }
    } else {
      if (isNaN(key as any)) response[key] = value;
      else
        response = [
          ...(response[0] ? response : []),
          getRecursiveStrapiObject(value),
        ];
    }
  }
  return response;
};
