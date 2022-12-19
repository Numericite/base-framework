import { FormikProps } from "formik";
import { ChangeEvent } from "react";

export const isPromise = (p: any): boolean => {
  return typeof p === "object" && typeof p.then === "function";
};

export const onChangeParseInt = (
  e: ChangeEvent<HTMLSelectElement>,
  formik: FormikProps<any>
) => {
  formik.setFieldValue(e.target.name, parseInt(e.target.value));
};

const monthReferences = [
  { name: "Janvier", value: 1 },
  { name: "Février", value: 2 },
  { name: "Mars", value: 3 },
  { name: "Avril", value: 4 },
  { name: "Mai", value: 5 },
  { name: "Juin", value: 6 },
  { name: "Juillet", value: 7 },
  { name: "Août", value: 8 },
  { name: "Septembre", value: 9 },
  { name: "Octobre", value: 10 },
  { name: "Novembre", value: 11 },
  { name: "Décembre", value: 12 },
];
export const monthToString = (month: number) => {
  return monthReferences.find((_) => _.value === month)?.name || "?";
};

export const humanFileSize = (bytes: number, si = false, dp = 1): string => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
};

export const stringToColour = (str: string): string => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export const removeUndefinedNestedFields = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key]))
      newObj[key] = removeUndefinedNestedFields(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};

export const removeNullNestedFields = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key]))
      newObj[key] = removeNullNestedFields(obj[key]);
    else if (obj[key] !== null) newObj[key] = obj[key];
  });
  return newObj;
};

export const removeNullAndUndefinedNestedFields = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key]))
      newObj[key] = removeNullAndUndefinedNestedFields(obj[key]);
    else if (obj[key] !== null && obj[key] !== undefined)
      newObj[key] = obj[key];
  });
  return newObj;
};
