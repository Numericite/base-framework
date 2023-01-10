import { Dispatch, SetStateAction } from "react";

export interface ChatBotProps {
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  isEditing?: boolean;
  toast: boolean;
  stepQuestion?: number;
  setStepQuestion?: any;
}

export interface ChatBotStepResponse {
  label: string;
  value: number;
  checked?: boolean;
}

export interface ChatBotStep {
  title: JSX.Element;
  slug: "help" | "personae" | "occupation" | "theme" | "subTheme";
  responses?: ChatBotStepResponse[];
}
