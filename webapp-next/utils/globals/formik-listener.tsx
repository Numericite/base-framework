import { useEffect, useState } from "react";

const objectsDiff = (o1: any, o2: any) =>
  Object.keys(o2).reduce((diff, key) => {
    if (o1[key] === o2[key]) return diff;
    return {
      ...diff,
      [key]: o2[key],
    };
  }, {});

const FormikListener = ({
  values,
  onFormChange,
  onValueChange,
}: {
  values: any;
  onFormChange?: (values: any) => void;
  onValueChange?: (key: string, value: any) => void;
}) => {
  const [currentValues, setCurrentValues] = useState();

  useEffect(() => {
    if (JSON.stringify(currentValues) !== JSON.stringify(values)) {
      setCurrentValues(values);

      if (onValueChange && currentValues) {
        const diff = objectsDiff(currentValues, values);
        const key = Object.keys(diff)[0];
        if (key && key in diff)
          onValueChange(key, diff[key as keyof typeof diff]);
      }
    }
  }, [onFormChange, values]);

  useEffect(() => {
    if (currentValues && onFormChange) onFormChange(currentValues);
  }, [currentValues]);

  return null;
};

export default FormikListener;
