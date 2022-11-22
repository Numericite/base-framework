import { ReactNode } from "react";

type ButtonDropdownOption = {
  label: string;
  value: string;
};

export type ButtonDropdownProps = {
  onChange?: (value: string) => void;
  size?: "lg" | "md" | "sm" | undefined;
  isOutline?: boolean;
  isRounded?: boolean;
  options: ButtonDropdownOption[];
  value: string;
  children: ReactNode;
};
